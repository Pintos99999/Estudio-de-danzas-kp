Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase
$dir = "C:\Users\56943042\Desktop\Danza Karen Pintos\_fotos-origen"
foreach ($f in (Get-ChildItem $dir -Filter "nuevo-*" | Sort-Object Name)) {
  $bi = New-Object System.Windows.Media.Imaging.BitmapImage
  $bi.BeginInit()
  $bi.UriSource = New-Object System.Uri($f.FullName)
  $bi.CacheOption = [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad
  $bi.CreateOptions = [System.Windows.Media.Imaging.BitmapCreateOptions]::IgnoreColorProfile
  $bi.EndInit()
  "{0,-16} {1}x{2}" -f $f.Name, $bi.PixelWidth, $bi.PixelHeight
}
