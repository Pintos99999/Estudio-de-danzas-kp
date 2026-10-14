# Procesador de imágenes basado en WIC (decodifica ya reducido: poca memoria)
param(
  [string]$Modo = "preview"
)

Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase

# Rutas relativas a este archivo: funciona en cualquier computadora.
$BASE = $PSScriptRoot
$SRC  = "$BASE\_fotos-origen"

function Load-Reduced([string]$path, [int]$w) {
  $bi = New-Object System.Windows.Media.Imaging.BitmapImage
  $bi.BeginInit()
  $bi.UriSource = New-Object System.Uri($path)
  $bi.DecodePixelWidth = $w
  $bi.CacheOption = [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad
  $bi.CreateOptions = [System.Windows.Media.Imaging.BitmapCreateOptions]::IgnoreColorProfile
  $bi.EndInit()
  $bi.Freeze()
  return $bi
}

function Save-Jpg($src, [string]$out, [int]$q) {
  $enc = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder
  $enc.QualityLevel = $q
  $enc.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($src))
  $dir = Split-Path $out -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  $fs = [System.IO.File]::Open($out, 'Create')
  $enc.Save($fs)
  $fs.Close()
}

# Recorte en coordenadas relativas (0..1) sobre la imagen ya reducida
function Crop-Rel($img, [double]$x, [double]$y, [double]$w, [double]$h) {
  $rect = New-Object System.Windows.Int32Rect(
    [int]($img.PixelWidth  * $x),
    [int]($img.PixelHeight * $y),
    [int]($img.PixelWidth  * $w),
    [int]($img.PixelHeight * $h))
  $c = New-Object System.Windows.Media.Imaging.CroppedBitmap($img, $rect)
  $c.Freeze()
  return $c
}

if ($Modo -eq "preview") {
  $t = @("FEED INSTAGRAM (2).jpg", "HISTORIA INSTAGRAM (3).jpg", "FEED INSTAGRAM (3).jpg")
  $i = 1
  foreach ($f in $t) {
    $img = Load-Reduced (Join-Path $SRC $f) 720
    Save-Jpg $img "$BASE\_prev$i.jpg" 80
    "$f -> _prev$i.jpg  ($($img.PixelWidth)x$($img.PixelHeight))"
    $i++
  }
}

if ($Modo -eq "build") {
  $DEST = "$BASE\assets\img"

  # --- HERO: banda central del corps de ballet (por debajo del texto) ---
  $bmpA = Load-Reduced (Join-Path $SRC "FEED INSTAGRAM (2).jpg") 2200
  $crop = Crop-Rel $bmpA 0.0 0.432 1.0 0.298
  Save-Jpg $crop "$DEST\hero.jpg" 82
  "hero.jpg          $($crop.PixelWidth)x$($crop.PixelHeight)"

  # --- OG: título + bailarinas, recorte 1.9:1 a 1200 px ---
  $bmpOg = Load-Reduced (Join-Path $SRC "FEED INSTAGRAM (2).jpg") 1200
  $crop = Crop-Rel $bmpOg 0.0 0.145 1.0 0.42
  Save-Jpg $crop "$DEST\og-image.jpg" 84
  "og-image.jpg      $($crop.PixelWidth)x$($crop.PixelHeight)"

  # --- RETRATO: bailarina con velo (sin texto) ---
  $bmpB = Load-Reduced (Join-Path $SRC "HISTORIA INSTAGRAM (3).jpg") 2400
  $crop = Crop-Rel $bmpB 0.225 0.352 0.47 0.332
  Save-Jpg $crop "$DEST\estudio.jpg" 84
  "estudio.jpg       $($crop.PixelWidth)x$($crop.PixelHeight)"

  # --- GALERÍA: las 11 piezas de la campaña ---
  $orden = @(
    "HISTORIA INSTAGRAM (3).jpg", "FEED INSTAGRAM (2).jpg", "FEED INSTAGRAM (3).jpg",
    "afiche-1.png",               "FEED INSTAGRAM (4).jpg", "HISTORIA INSTAGRAM (2).jpg",
    "afiche-2.png",               "FEED INSTAGRAM (1).jpg", "HISTORIA INSTAGRAM (1).jpg",
    "FEED INSTAGRAM (6).jpg",     "FEED INSTAGRAM (5).jpg"
  )
  $n = 1
  foreach ($f in $orden) {
    $ruta = Join-Path $SRC $f
    if (-not (Test-Path $ruta)) { "FALTA: $f"; continue }
    $bmpG = Load-Reduced $ruta 1100
    $out = "$DEST\galeria\{0:D2}.jpg" -f $n
    Save-Jpg $bmpG $out 80
    "galeria/{0:D2}.jpg  {1}x{2}  {3} KB" -f $n, $bmpG.PixelWidth, $bmpG.PixelHeight, [int]((Get-Item $out).Length / 1KB)
    $n++
  }
}

if ($Modo -eq "familia") {
  $DEST = "$BASE\assets\img"
  $bmpF = Load-Reduced "$SRC\elenco-teatro.webp" 1400
  Save-Jpg $bmpF "$DEST\familia.jpg" 76
  "familia.jpg  $($bmpF.PixelWidth)x$($bmpF.PixelHeight)  $([int]((Get-Item "$DEST\familia.jpg").Length/1KB)) KB"
}

if ($Modo -eq "nuevo") {
  $DEST = "$BASE\assets\img"

  # --- Cuadrados oficiales de cada disciplina ---
  $discs = @{ "nuevo-7.png" = "ballet"; "nuevo-6.png" = "expresion";
              "nuevo-5.png" = "urban";  "nuevo-4.png" = "arabe" }
  foreach ($k in $discs.Keys) {
    $b = Load-Reduced "$SRC\$k" 600
    $o = "$DEST\disciplinas\$($discs[$k]).jpg"
    Save-Jpg $b $o 86
    "disciplinas/$($discs[$k]).jpg  $($b.PixelWidth)x$($b.PixelHeight)  $([int]((Get-Item $o).Length/1KB)) KB"
  }

  # --- Logo K (se queda en PNG, es un dibujo) ---
  $logo = Load-Reduced "$SRC\nuevo-8.png" 512
  $enc = New-Object System.Windows.Media.Imaging.PngBitmapEncoder
  $enc.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($logo))
  $fs = [System.IO.File]::Open("$DEST\logo-k.png", 'Create'); $enc.Save($fs); $fs.Close()
  "logo-k.png  $($logo.PixelWidth)x$($logo.PixelHeight)  $([int]((Get-Item "$DEST\logo-k.png").Length/1KB)) KB"

  # --- Galería: fotos reales de las funciones ---
  $fotos = @("nuevo-9.webp","nuevo-10.webp","nuevo-11.webp","nuevo-12.webp",
             "nuevo-13.webp","nuevo-14.webp","nuevo-15.webp","nuevo-16.webp")
  Get-ChildItem "$DEST\galeria" -Filter *.jpg | Remove-Item -Force
  $n = 1
  foreach ($f in $fotos) {
    $b = Load-Reduced "$SRC\$f" 1200
    $o = "$DEST\galeria\{0:D2}.jpg" -f $n
    Save-Jpg $b $o 78
    "galeria/{0:D2}.jpg  {1}x{2}  {3} KB" -f $n, $b.PixelWidth, $b.PixelHeight, [int]((Get-Item $o).Length/1KB)
    $n++
  }
}
