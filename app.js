// Node JS app to watch a folder and rsync it to my NAS
'use strict';

var watch = require('watch')
  , rsync = require('rsyncwrapper').rsync
  , watchDir = '/Users/BBerger/Work/'
  , destDir = '/mnt/NAS_RAID1/WorkArchive'
  , isSyncing = false; // only sync when we are currently not syncing

watch.watchTree( watchDir, function (f, curr, prev) {

	console.log('Tree Change');

	if(isSyncing) return false;
  	isSyncing = true;

	rsync({
	    src: watchDir,
	    dest: destDir,
	    // exclude: ['/.*'], // exclude dot files
	    host: "BryanBerger@freenas",
	    recursive: true,
	    dryRun: false,
	    syncDest: true,
	    compareMode: 'checksum',
	    args: ["--verbose", "--inplace"]
	}, function (error, stdout, stderr, cmd) {
		isSyncing = false;
	});

})

console.log('Watching: ' + watchDir);