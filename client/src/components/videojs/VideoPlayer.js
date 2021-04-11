import React, { Component } from 'react'
import videojs from 'video.js'

import 'video.js/dist/video-js.css'
import 'videojs-contrib-quality-levels'
import 'videojs-hls-quality-selector'


const videoJsOptions = {
  autoplay: true,
  controls: true,
  muted: true,
  height: 300,
  width: 500,
}



class VideoJS extends Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, videoJsOptions, () => {
      this.player.hlsQualitySelector({
        displayCurrentQuality: false,
      });
    });

    const player = this.player

    let qualityLevels = player.qualityLevels();


    // Listen to change events for when the player selects a new quality level
    // qualityLevels.on('change', function (option) {
    //   console.log(qualityLevels)
    //   // qualityLevels.selectedIndex = option.selectedIndex
    //   console.log('New level:', qualityLevels[qualityLevels.selectedIndex]);
    // });
    qualityLevels.trigger({ type: 'change', selectedIndex: 2 });

  }


  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }
  render() {
    return (
      <>
        <div data-vjs-player>
          <video ref={node => this.videoNode = node} className="video-js">
            <source src='https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8' type="application/x-mpegURL" />
          </video>
        </div>
        <button onClick={() => this.player.pause()}>pouse</button>
        <button onClick={() => this.player.play()}>play</button>
      </>

    )
  }
}

export default VideoJS;