$content = Get-Content -Raw index.html
$pattern = '<img[^>]+src="([^"]+)"'
$matches = [regex]::Matches($content, $pattern) | ForEach-Object {
    $_.Groups[1].Value
}
$matches | Sort-Object -Unique

