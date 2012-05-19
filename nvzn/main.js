function main() {

  console.log('Starting');
 if (Nvzn.loadingImages > 0) {
   console.log('running, but images are not ready yet');
   Nvzn.ready = true;
 } else {
   console.log('Images are ready, good to go.');
   Nvzn.start();
 }

}

