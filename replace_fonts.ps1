$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace 'text-base', 'text-[17px]'
    $content = $content -replace 'text-sm', 'text-[16px]'
    $content = $content -replace 'text-xs', 'text-[14px]'
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}
