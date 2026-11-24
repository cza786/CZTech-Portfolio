Add-Type -TypeDefinition @"
using System;
using System.IO;
using System.Threading.Tasks;
using Windows.Graphics.Imaging;
using Windows.Media.Ocr;
using Windows.Storage;

public class WinOcrHelper {
    public static async Task<string> RecognizeFile(string path) {
        var file = await StorageFile.GetFileFromPathAsync(path);
        using (var stream = await file.OpenAsync(FileAccessMode.Read)) {
            var decoder = await BitmapDecoder.CreateAsync(stream);
            var bitmap = await decoder.GetSoftwareBitmapAsync();
            var engine = OcrEngine.TryCreateFromUserProfileLanguages();
            if (engine == null) return "No engine";
            var result = await engine.RecognizeAsync(bitmap);
            return string.Join(" | ", System.Linq.Enumerable.Select(result.Lines, l => l.Text));
        }
    }
}
"@ -ReferencedAssemblies @("System.Runtime.WindowsRuntime.dll", "System.Linq.dll")
