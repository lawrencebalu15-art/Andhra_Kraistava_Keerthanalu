const BATCH_SIZE = 30; // Number of thumbnails to load at once
let currentIndex = 0;
const container = document.getElementById('videos-container');

function extractVideoID(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match && match[7].length == 11) ? match[7] : null;
}

function createVideoThumbnail(videoId) {
  var div = document.createElement('div');
  div.className = 'youtube';

  var link = document.createElement('a');
  link.href = 'https://www.youtube.com/watch?v=' + videoId;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  var img = document.createElement('img');
  img.src = 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
  img.alt = 'Video thumbnail';

  var playButton = document.createElement('div');
  playButton.className = 'play-button';

  link.appendChild(img);
  link.appendChild(playButton);
  div.appendChild(link);

  return div;
}

function loadVideosBatch() {
  const batch = songsList.slice(currentIndex, currentIndex + BATCH_SIZE);

  batch.forEach(function(song) {
    if (!song.youtubeLinks) return;

    // Adapt splitting based on your data structure (comma, space separated)
    var links = song.youtubeLinks.split(/[, ]+/).map(link => link.trim());

    links.forEach(function(link) {
      var videoId = extractVideoID(link);
      if (videoId) {
        const thumbnail = createVideoThumbnail(videoId);
        container.appendChild(thumbnail);
      }
    });
  });

  currentIndex += BATCH_SIZE;
}

function handleScroll() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    if (currentIndex < songsList.length) {
      loadVideosBatch();
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  loadVideosBatch();
  window.addEventListener('scroll', handleScroll);
});
