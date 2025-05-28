const functions = require('firebase-functions');
const express = require('express');
const app = express();

// XSS Protection Function
const escapeHtml = (unsafe) => {
  return unsafe?.toString().replace(/[&<"'>]/g, (char) => {
    switch(char) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return char;
    }
  }) || '';
};

app.get('/share', (req, res) => {
  // Validate required parameters
  if (!req.query.title || !req.query.redirect) {
    return res.status(400).send('Missing required parameters: title and redirect');
  }

  // Sanitize all inputs
  const title = escapeHtml(req.query.title);
  const description = escapeHtml(req.query.description || '');
  const image = escapeHtml(req.query.image || '');
  const redirect = escapeHtml(req.query.redirect);

  const html = `
<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns# article: https://ogp.me/ns/article#">
<head>
  <meta charset="utf-8">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${image}">
  <meta property="og:url" content="https://ngblog-2025.web.app${redirect}">
  <meta property="og:type" content="article">
  
  <!-- LinkedIn Specific Tags -->
  <meta property="article:published_time" content="${new Date().toISOString()}">
  <meta property="article:author" content="NGBlog">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@AR_JRIDI">
  
  <meta http-equiv="refresh" content="0;url=https://ngblog-2025.web.app${redirect}">
</head>
<body>
  <noscript>
    <meta http-equiv="refresh" content="0;url=https://ngblog-2025.web.app${redirect}">
  </noscript>
  Redirecting to article...
</body>
</html>
  `;

  res.set('Content-Type', 'text/html');
  res.send(html);
});

exports.share = functions.https.onRequest(app);