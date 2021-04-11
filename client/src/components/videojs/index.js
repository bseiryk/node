import React, { Component } from 'react'
import videojs from 'video.js'

import VideoPlayer from './VideoPlayer'


class VideoJS extends Component {
  render() {
    // const videoJsOptions = {
    //   autoplay: true,
    //   controls: true,
    //   muted: true,
    //   height: 300,
    //   width: 500,
    //   html5: {
    //     vhs: {
    //       overrideNative: true
    //     }
    //   },
    //   // sources: [{
    //   //   url: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
    //   //   type: 'application/x-mpegURL',
    //   // }]
    //   // sources: [
    //   //   {
    //   //     src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
    //   //     type: 'video/mp4',
    //   //     label: '576p',
    //   //   },
    //   //   {
    //   //     src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
    //   //     type: 'video/mp4',
    //   //     label: '720P',
    //   //   },
    //   //   {
    //   //     src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
    //   //     type: 'video/mp4',
    //   //     label: '1080p',
    //   //   },
    //   // ]
    // }
    return (
      <>
        <div data-vjs-player>
          <VideoPlayer />
        </div>
      </>
    )
  }
}

export default VideoJS;