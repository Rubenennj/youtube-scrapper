import { createWriteStream } from 'fs';
import { FFmpeg } from 'prism-media';
import { getVideoInfo } from '../functions/getVideoInfo';
import { downloadFromVideo } from '../functions/downloadFromVideo';

async function d() {
    const video = await getVideoInfo('https://www.youtube.com/watch?v=5qap5aO4i9A');
    const format = video.formats.find((format) => format.isDashMPD && format.hasAudio);
    const stream = downloadFromVideo(video, format);
    const ffmpeg = new FFmpeg({ args: ['-f', 's16le', '-ar', '48000', '-ac', '2', '-vn'] });
    const writable = createWriteStream(`test.${format!.codec}`);

    stream.pipe(ffmpeg).pipe(writable);
}

d();
