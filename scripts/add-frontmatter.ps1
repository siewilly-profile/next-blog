$ErrorActionPreference = "Stop"

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

function Add-Frontmatter([string]$filePath, [hashtable]$meta) {
    if (!(Test-Path $filePath)) {
        Write-Warning "Missing file: $filePath"
        return
    }

    $content = Get-Content -Raw -Path $filePath
    if ($content -match "^\s*---") {
        return
    }

    $frontmatter = Build-Frontmatter $meta
    Set-Content -Path $filePath -Value ($frontmatter + $content) -Encoding UTF8
}

function Load-Json([string]$path) {
    if (!(Test-Path $path)) { return @() }
    $raw = Get-Content -Raw -Path $path -Encoding UTF8
    if (!$raw) { return @() }
    return $raw | ConvertFrom-Json
}

$blogPosts = Load-Json ".\posts\blog\posts.json"
foreach ($post in $blogPosts) {
    Add-Frontmatter ".\posts\blog\$($post.slug).md" @{
        title = $post.title
        slug = $post.slug
        date = $post.date
        description = $post.description
        tags = $post.tags
    }
}

$apcsPosts = Load-Json ".\posts\solution\APCS\posts.json"
foreach ($post in $apcsPosts) {
    Add-Frontmatter ".\posts\solution\APCS\$($post.slug).md" @{
        title = $post.title
        slug = $post.slug
        date = $post.date
        description = $post.description
        tags = $post.tags
        category = "APCS"
    }
}

$zerojudgePosts = Load-Json ".\posts\solution\Zerojudge\posts.json"
foreach ($post in $zerojudgePosts) {
    Add-Frontmatter ".\posts\solution\Zerojudge\$($post.slug).md" @{
        title = $post.title
        slug = $post.slug
        date = $post.date
        description = $post.description
        tags = $post.tags
        category = "Zerojudge"
    }
}
