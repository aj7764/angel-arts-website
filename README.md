# Angel Arts & Culinary Academy Website

A fully responsive, modern, high-conversion website for Angel Arts & Culinary Academy — a warm, professional bakery & cake-decorating school based in Trichy.

## 🎨 Design Features

- **Warm Color Palette**: Cream (#FFF7EE), Butter Yellow (#F6D29C), Baker's Rose (#D96A6A), Deep Cocoa (#3B2F2F)
- **Typography**: Playfair Display (headlines) + Inter (body)
- **Fully Responsive**: Mobile-first design that works on all devices
- **Accessibility**: WCAG compliant with proper contrast ratios and semantic HTML
- **Performance**: Optimized for fast loading

## 📁 Project Structure

```
angel-arts-website/
├── index.html          # Home page
├── courses.html        # Courses listing with filters
├── about.html          # About us page
├── gallery.html        # Photo gallery with lightbox
├── testimonials.html   # Student success stories
├── contact.html        # Contact form and booking
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── main.js         # JavaScript for interactions
├── images/            # Image assets (add your photos here)
└── README.md          # This file
```

## 🚀 Getting Started

### Local Development

1. Open `index.html` in a web browser
2. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```
3. Navigate to `http://localhost:8000`

### Deployment

Upload all files to your web hosting service. The site is static HTML/CSS/JS, so it works on any hosting provider:
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting (cPanel, etc.)

## 📝 Admin Instructions

### Adding/Updating Course Information

1. Open `courses.html`
2. Find the course card you want to edit (or duplicate an existing one)
3. Update the following:
   - Course title (`<h3>`)
   - Description (`<p class="course-description">`)
   - Duration (`<span class="course-duration">`)
   - Modules list (`<ul>` inside `.course-modules`)
   - Prerequisites (`<div class="course-prerequisites">`)
   - Price (`<div class="course-price">`)
   - Category attributes (`data-category="short professional"`)

### Adding Images

1. Add your images to the `images/` folder
2. Replace placeholder divs with actual `<img>` tags:
   ```html
   <!-- Replace this -->
   <div class="gallery-image-placeholder">
       <span>📸 Layered Cake</span>
   </div>
   
   <!-- With this -->
   <img src="images/layered-cake.jpg" alt="Layered Cake with Buttercream" loading="lazy">
   ```

### Updating Testimonials

1. Open `testimonials.html` or `index.html` (for preview section)
2. Find a testimonial card
3. Update:
   - Quote text (`<p class="testimonial-text">`)
   - Author name (`<div class="author-name">`)
   - Location (`<div class="author-location">`)
   - Success badge (`<div class="testimonial-badge">`)

### Updating Contact Information

1. Open `contact.html`
2. Update:
   - Address
   - Phone number (update in multiple places)
   - Email
   - Operating hours
3. Also update in `index.html` footer section

### Adding Google Maps

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your address
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the placeholder in `contact.html`:
   ```html
   <div class="map-placeholder">...</div>
   ```
   With:
   ```html
   <iframe src="YOUR_GOOGLE_MAPS_EMBED_URL" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
   ```

### Connecting Forms to Backend

The forms are currently set up with placeholder submission handlers. To connect them:

1. **Option 1: Google Forms + Zapier**
   - Create Google Forms for each form
   - Use Zapier to send emails/SMS on form submission

2. **Option 2: Airtable + Zapier**
   - Create Airtable base
   - Use Zapier to send confirmation emails

3. **Option 3: Custom Backend**
   - Update the fetch calls in `js/main.js`
   - Replace the TODO sections with actual API endpoints

### Adding Analytics

1. **Google Analytics**
   - Get your tracking ID
   - Add to `index.html` before `</head>`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_TRACKING_ID');
   </script>
   ```

2. **Facebook Pixel**
   - Get your pixel ID
   - Add to `index.html` before `</head>`:
   ```html
   <!-- Facebook Pixel Code -->
   <script>
     !function(f,b,e,v,n,t,s)
     {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
     n.callMethod.apply(n,arguments):n.queue.push(arguments)};
     if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
     n.queue=[];t=b.createElement(e);t.async=!0;
     t.src=v;s=b.getElementsByTagName(e)[0];
     s.parentNode.insertBefore(t,s)}(window, document,'script',
     'https://connect.facebook.net/en_US/fbevents.js');
     fbq('init', 'FACEBOOK_PIXEL_ID');
     fbq('track', 'PageView');
   </script>
   ```

## 🎯 SEO Optimization

The site includes:
- ✅ Meta descriptions on all pages
- ✅ Semantic HTML structure
- ✅ Structured data (Schema.org) for Organization
- ✅ Alt text placeholders for images (add actual alt text when adding images)
- ✅ Proper heading hierarchy (H1 → H2 → H3)

### To Complete SEO Setup:

1. Add actual image alt text when replacing placeholders
2. Add Course schema to `courses.html` (see Schema.org documentation)
3. Add LocalBusiness schema with complete address
4. Submit sitemap to Google Search Console

## 📱 Mobile Optimization

- Responsive navigation with hamburger menu
- Touch-friendly buttons (minimum 44x44px)
- Optimized images (use WebP format when possible)
- Fast loading (aim for <1.2MB per page)

## 🎨 Customization

### Changing Colors

Edit CSS variables in `css/styles.css`:
```css
:root {
    --cream: #FFF7EE;
    --butter-yellow: #F6D29C;
    --bakers-rose: #D96A6A;
    --deep-cocoa: #3B2F2F;
}
```

### Changing Fonts

Update the Google Fonts link in each HTML file's `<head>` section.

## 📞 Support

For questions or customization help, refer to the code comments or contact your web developer.

## 📄 License

This website template is created for Angel Arts & Culinary Academy. All rights reserved.

---

**Built with ❤️ for Angel Arts & Culinary Academy**

