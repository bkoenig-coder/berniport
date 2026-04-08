# Media Directory

This folder is created for you to upload your pictures, videos, and other media assets. 

## How to use these files in your website

Since this folder is inside the `public` directory, any file you upload here can be referenced directly by its path starting with `/media/`.

### Example: Image
If you upload a file named `profile.jpg` into this folder, you can use it in your React code like this:

```tsx
<img src="/media/profile.jpg" alt="Profile Picture" />
```

### Example: Video
If you upload a video named `performance.mp4`, you can use it like this:

```tsx
<video controls>
  <source src="/media/performance.mp4" type="video/mp4" />
</video>
```

**Note:** You can use the file explorer on the left to drag and drop your media files directly into this `public/media` folder!
