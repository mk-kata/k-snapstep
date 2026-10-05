<?php
// noteマガジンのRSSを取得し、最新記事をJSONで返す（1時間キャッシュ）
$feedUrl = 'https://note.com/web_tanto/m/m535d728c6746/rss';
$cache = dirname(__FILE__) . '/note-feed-cache.json';
$ttl = 3600;
$limit = 6;

header('Content-Type: application/json; charset=utf-8');

if (is_file($cache) && time() - filemtime($cache) < $ttl) {
    readfile($cache);
    exit;
}

$xml = false;
if (function_exists('curl_init')) {
    $ch = curl_init($feedUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 8);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    $xml = curl_exec($ch);
    curl_close($ch);
}
if (!$xml) {
    $xml = @file_get_contents($feedUrl);
}

$items = array();
$series = '';
$rss = $xml ? @simplexml_load_string($xml) : false;
if ($rss && isset($rss->channel)) {
    $series = (string)$rss->channel->title;
    foreach ($rss->channel->item as $item) {
        $media = $item->children('http://search.yahoo.com/mrss/');
        $items[] = array(
            'title' => (string)$item->title,
            'url' => (string)$item->link,
            'date' => date('Y-m-d', strtotime((string)$item->pubDate)),
            'thumbnail' => (string)$media->thumbnail,
        );
        if (count($items) >= $limit) break;
    }
}

if (!$items) {
    // 取得失敗時は古いキャッシュがあればそれを返す
    if (is_file($cache)) { readfile($cache); } else { echo '{"series":"","items":[]}'; }
    exit;
}

$json = json_encode(array('series' => $series, 'items' => $items));
@file_put_contents($cache, $json);
echo $json;
