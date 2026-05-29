$ErrorActionPreference = "Stop"

$utf8 = New-Object System.Text.UTF8Encoding($false)

function Escape-YamlString([string]$value) {
    if ($null -eq $value) { return "" }
    return $value.Replace('"', '\"')
}

function Build-Frontmatter([hashtable]$meta) {
    $lines = @()
    $lines += "---"
    if ($meta.title) { $lines += "title: `"$(Escape-YamlString $meta.title)`"" }
    if ($meta.slug) { $lines += "slug: `"$(Escape-YamlString $meta.slug)`"" }
    if ($meta.date) { $lines += "date: `"$(Escape-YamlString $meta.date)`"" }
    if ($meta.description) { $lines += "description: `"$(Escape-YamlString $meta.description)`"" }
    if ($meta.category) { $lines += "category: `"$(Escape-YamlString $meta.category)`"" }

    if ($meta.tags -and $meta.tags.Count -gt 0) {
        $lines += "tags:"
        foreach ($tag in $meta.tags) {
            $lines += "  - `"$(Escape-YamlString $tag)`""
        }
    } else {
        $lines += "tags: []"
    }

    $lines += "---"
    return ($lines -join "`n") + "`n`n"
}

function Get-GitBlobBytes([string]$gitPath) {
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = "git"
    $psi.Arguments = "show HEAD:$gitPath"
    $psi.RedirectStandardOutput = $true
    $psi.UseShellExecute = $false
    $process = [System.Diagnostics.Process]::Start($psi)
    $ms = New-Object System.IO.MemoryStream
    $process.StandardOutput.BaseStream.CopyTo($ms)
    $process.WaitForExit()
    if ($process.ExitCode -ne 0) {
        throw "Failed to read $gitPath from git"
    }
    return $ms.ToArray()
}

function Write-With-Frontmatter([string]$destPath, [string]$frontmatter, [byte[]]$bodyBytes) {
    $frontBytes = $utf8.GetBytes($frontmatter)
    $bytes = New-Object byte[] ($frontBytes.Length + $bodyBytes.Length)
    [System.Array]::Copy($frontBytes, 0, $bytes, 0, $frontBytes.Length)
    [System.Array]::Copy($bodyBytes, 0, $bytes, $frontBytes.Length, $bodyBytes.Length)
    [System.IO.File]::WriteAllBytes($destPath, $bytes)
}

function Load-Json([string]$path) {
    if (!(Test-Path $path)) { return @() }
    $raw = Get-Content -Raw -Path $path -Encoding UTF8
    if (!$raw) { return @() }
    return $raw | ConvertFrom-Json
}

$blogPosts = Load-Json ".\posts\blog\posts.json"
foreach ($post in $blogPosts) {
    $gitPath = "posts/blog/$($post.slug).md"
    $destPath = ".\posts\blog\$($post.slug).md"
    $bodyBytes = Get-GitBlobBytes $gitPath
    $frontmatter = Build-Frontmatter @{
        title = $post.title
        slug = $post.slug
        date = $post.date
        description = $post.description
        tags = $post.tags
    }
    Write-With-Frontmatter $destPath $frontmatter $bodyBytes
}

$apcsPosts = Load-Json ".\posts\solution\APCS\posts.json"
foreach ($post in $apcsPosts) {
    $gitPath = "posts/solution/APCS/$($post.slug).md"
    $destPath = ".\posts\solution\APCS\$($post.slug).md"
    $bodyBytes = Get-GitBlobBytes $gitPath
    $frontmatter = Build-Frontmatter @{
        title = $post.title
        slug = $post.slug
        date = $post.date
        description = $post.description
        tags = $post.tags
        category = "APCS"
    }
    Write-With-Frontmatter $destPath $frontmatter $bodyBytes
}

$zerojudgePosts = Load-Json ".\posts\solution\Zerojudge\posts.json"
foreach ($post in $zerojudgePosts) {
    $gitPath = "posts/solution/Zerojudge/$($post.slug).md"
    $destPath = ".\posts\solution\Zerojudge\$($post.slug).md"
    $bodyBytes = Get-GitBlobBytes $gitPath
    $frontmatter = Build-Frontmatter @{
        title = $post.title
        slug = $post.slug
        date = $post.date
        description = $post.description
        tags = $post.tags
        category = "Zerojudge"
    }
    Write-With-Frontmatter $destPath $frontmatter $bodyBytes
}
