Add-Type -AssemblyName System.Drawing
$src = "C:\Users\redre\OneDrive\Desktop\YVD\frontend\public\logo.png"
$tmp = "C:\Users\redre\OneDrive\Desktop\YVD\frontend\public\logo_copy.png"
Copy-Item $src $tmp -Force
$bmp = [System.Drawing.Bitmap]::FromFile($tmp)
$rect = New-Object System.Drawing.Rectangle(0, 0, $bmp.Width, $bmp.Height)
$bmpData = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$ptr = $bmpData.Scan0
$bytes = [Math]::Abs($bmpData.Stride) * $bmp.Height
$rgbValues = New-Object byte[] $bytes
[System.Runtime.InteropServices.Marshal]::Copy($ptr, $rgbValues, 0, $bytes)

for ($i = 0; $i -lt $rgbValues.Length; $i += 4) {
    # Format is BGRA
    $b = $rgbValues[$i]
    $g = $rgbValues[$i+1]
    $r = $rgbValues[$i+2]
    
    $brightness = ($r + $g + $b) / 3.0
    
    # Background is ~212. Logo is ~30. 
    # Map brightness to Alpha (darker = more opaque)
    $alpha = 255 - [math]::Min(255, [int](($brightness / 180.0) * 255))
    if ($alpha -lt 0) { $alpha = 0 }
    
    # We want the logo to be Pure White on transparent
    $rgbValues[$i] = 255   # B
    $rgbValues[$i+1] = 255 # G
    $rgbValues[$i+2] = 255 # R
    $rgbValues[$i+3] = $alpha # A
}

[System.Runtime.InteropServices.Marshal]::Copy($rgbValues, 0, $ptr, $bytes)
$bmp.UnlockBits($bmpData)

# Save to the original path, replacing it entirely
$bmp.Save($src, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Remove-Item $tmp -Force

Write-Host "True Alpha Transparency applied successfully!"
