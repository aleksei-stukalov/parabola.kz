// /**
//  * @type {HTMLDivElement}
//  */

const w = window;
const heroVideo = document.querySelector('#hero-video'),
    heroContent = document.querySelector('#hero-content'),
    serviceVideo = document.querySelector('#service-video'),
    serviceContent = document.querySelector('#service-content'),
    topSectionVideosArray = [
        heroVideo,
        serviceVideo
    ];

function heroOnScroll(_scrollOffset) {
    // heroVideo.style.top = _scrollOffset + 'px';
    heroContent.style.top = (_scrollOffset * 0.4) + 'px';
};

function serviceOnScroll(_scrollOffset) {
    let _viewportHeight = w.innerHeight;
    serviceVideo.style.top = (_scrollOffset - _viewportHeight) + 'px';
    serviceContent.style.top = ((_viewportHeight - w.pageYOffset) * 0.4) + 'px';
};

// const topSectionVideosArray = [
//     heroVideo,
//     serviceVideo
// ];
// function topSectionVideosStart() {
//     let _videoCounter = 0;
//     function _videosStart() {
//         topSectionVideosArray.forEach(element => {
//             element.play();
//         })
//     };
//     if (_videoCounter === 2) _videosStart();
//     else _videoCounter++;
// }
// topSectionVideosArray.forEach(element => element.addEventListener('canplaythrough', topSectionVideosStart));

function topSectionVideosStart() {
    topSectionVideosArray.forEach(element => {
        element.play();
    })
};
topSectionVideosArray.forEach(element => element.addEventListener('canplaythrough', topSectionVideosStart));
if (topSectionVideosArray[0].readyState === 4 && topSectionVideosArray[1].readyState === 4) topSectionVideosStart();

// const videos = [
//     {
//         element: document.querySelector('#hero-video'),
//         loaded: false,
//     },
//     {
//         element: document.querySelector('#service-video'),
//         loaded: false,
//     }
// ];
// function onLoad() {
//     console.log('tester');
//     // dynamically find which video fired the function
//     const thisVideo = videos.find(video => video.element === this);
//     // update state
//     thisVideo.loaded = true;
//     // check whether all are loaded now
//     const allLoaded = videos.every(video => video.loaded);
//     if (allLoaded) {
//         // actually start playing all
//         videos.forEach(video => video.element.play());
//     }
// }
// videos.forEach(video => video.element.addEventListener('canplaythrough', onLoad));
//
//
//
// const lock = (numberOfVideos = 10) => {
//     const counter = 0
//     const playAll = () => {
//         // Do your play all here
//     }
//     return () => {
//         counter++
//         if (counter === numberOfVideos) {
//             playAll()
//         }
//     }
// }
// const videoElements = [
//     document.querySelector('#hero-video'),
//     document.querySelector('#service-video')
// ]
// const unlocker = lock(videoElements.length)
// videoElements.forEach(vid => vid.addEventListener('canplaythrough', unlocker))
//
//
//
// const topSectionVideosArray = [
//     document.querySelector('#hero-video'),
//     document.querySelector('#service-video')
// ];
// function topSectionVideoStart() {
//     console.log('tester');
//     topSectionVideosArray.forEach(element => {
//         element.play();
//     })
// };
// topSectionVideosArray.forEach(element => element.addEventListener('canplaythrough', topSectionVideoStart))
//
//
//
// function topSectionVideoStart() {
//     serviceVideo.addEventListener('canplaythrough', () => {
//         heroVideo.play()
//     });
// }
// heroVideo.addEventListener('canplaythrough', topSectionVideoStart());
//
//
//
// function topSectionVideoStart() {
//     let _heroVideoLoaded = false;
//     let _serviceVideoLoaded = false;
//     heroVideo.oncanplaythrough = function () { _heroVideoLoaded = true; }
//     serviceVideo.oncanplaythrough = function () { _serviceVideoLoaded = true; };
//     heroVideo.oncanplaythrough();
//     serviceVideo.oncanplaythrough();
//     if (_heroVideoLoaded || _serviceVideoLoaded) {
//         heroVideo.play();
//         serviceVideo.play();
//     }
// };
// topSectionVideoStart();
//
//
//
// heroVideo.oncanplaythrough = function () {
//     serviceVideo.oncanplaythrough = function () {
//         heroVideo.play();
//         serviceVideo.play();
//     };
//     serviceVideo.oncanplaythrough();
// };
// heroVideo.oncanplaythrough();

let scheduledAnimationFrame = false;
w.addEventListener('scroll', () => {
    const _windowScrollOffset = w.pageYOffset;
    if (!scheduledAnimationFrame) {
        w.requestAnimationFrame(() => {
            heroOnScroll(_windowScrollOffset);
            serviceOnScroll(_windowScrollOffset);

            scheduledAnimationFrame = false;
        });
        scheduledAnimationFrame = true;
    }
})

// let frameNumber = 0;
// let playbackConst = 150
// let vid = document.getElementById('service-video');
// function scrollPlay() {
//     var frameNumber = window.pageYOffset / playbackConst;
//     vid.currentTime = frameNumber;
//     window.requestAnimationFrame(scrollPlay);
// }
// window.requestAnimationFrame(scrollPlay);