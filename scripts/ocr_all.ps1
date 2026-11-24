Add-Type -AssemblyName System.Drawing
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()

function Get-OcrText($path) {
    try {
        $fileTask = [Windows.Storage.StorageFile]::GetFileFromPathAsync($path)
        $file = $fileTask.GetAwaiter().GetResult()
        $streamTask = $file.OpenAsync([Windows.Storage.FileAccessMode]::Read)
        $stream = $streamTask.GetAwaiter().GetResult()
        $decoderTask = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)
        $decoder = $decoderTask.GetAwaiter().GetResult()
        $bmpTask = $decoder.GetSoftwareBitmapAsync()
        $bmp = $bmpTask.GetAwaiter().GetResult()
        $ocrTask = $engine.RecognizeAsync($bmp)
        $result = $ocrTask.GetAwaiter().GetResult()
        $lines = ($result.Lines | ForEach-Object { $_.Text }) -join " "
        return $lines
    } catch {
        return "Error: $($_.Exception.Message)"
    }
}

$folders = @('ALMATAR', 'NTDH', 'Barbershop', 'Fischlevy', 'SevPark', 'Smart-Worker')

foreach ($folder in $folders) {
    Write-Output "`n==================== $folder ===================="
    $files = Get-ChildItem -Path $folder -Filter "*.jpeg" | Sort-Object Name
    foreach ($f in $files) {
        $fullPath = $f.FullName
        $text = Get-OcrText $fullPath
        $summary = if ($text.Length -gt 150) { $text.Substring(0, 150) + "..." } else { $text }
        Write-Output "[$($f.Name)]: $summary"
    }
}
