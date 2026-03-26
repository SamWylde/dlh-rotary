'use client'

export const FacebookFeed = () => (
  <div className="flex justify-center">
    <iframe
      src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100064347773545&tabs=timeline&width=340&height=380&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false"
      width="340"
      height="380"
      style={{ border: 'none', overflow: 'hidden', maxWidth: '100%' }}
      scrolling="no"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    />
  </div>
)
