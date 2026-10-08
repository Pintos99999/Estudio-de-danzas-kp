Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase
$SRC = "C:\Users\56943042\Desktop\Danza Karen Pintos\_fotos-origen"

function Pixel([string]$path, [double]$x, [double]$y) {
  $bi = New-Object System.Windows.Media.Imaging.BitmapImage
  $bi.BeginInit(); $bi.UriSource = New-Object System.Uri($path)
  $bi.DecodePixelWidth = 200
  $bi.CacheOption = 'OnLoad'; $bi.CreateOptions = 'IgnoreColorProfile'
  $bi.EndInit(); $bi.Freeze()
  $c = New-Object System.Windows.Media.Imaging.FormatConvertedBitmap($bi, [System.Windows.Media.PixelFormats]::Bgra32, $null, 0)
  $px = [int]($c.PixelWidth * $x); $py = [int]($c.PixelHeight * $y)
  $buf = New-Object byte[] 4
  $rect = New-Object System.Windows.Int32Rect($px, $py, 1, 1)
  $c.CopyPixels($rect, $buf, 4, 0)
  return "{0} {1} {2}" -f $buf[2], $buf[1], $buf[0]
}

# Cuadrados de disciplina: esquina (fondo) y centro del "+" (acento)
"ARABE-fondo     : $(Pixel "$SRC\nuevo-4.png" 0.05 0.05)"
"URBAN-fondo     : $(Pixel "$SRC\nuevo-5.png" 0.05 0.05)"
"EXPRESION-fondo : $(Pixel "$SRC\nuevo-6.png" 0.05 0.05)"
"BALLET-fondo    : $(Pixel "$SRC\nuevo-7.png" 0.05 0.05)"
"LOGO-K          : $(Pixel "$SRC\nuevo-8.png" 0.40 0.50)"
# Banner: las cinco franjas, de izquierda a derecha
"BANNER franja 1 : $(Pixel "$SRC\nuevo-3.jpg" 0.03 0.12)"
"BANNER franja 2 : $(Pixel "$SRC\nuevo-3.jpg" 0.25 0.12)"
"BANNER franja 3 : $(Pixel "$SRC\nuevo-3.jpg" 0.45 0.12)"
"BANNER franja 4 : $(Pixel "$SRC\nuevo-3.jpg" 0.65 0.12)"
"BANNER franja 5 : $(Pixel "$SRC\nuevo-3.jpg" 0.92 0.12)"
