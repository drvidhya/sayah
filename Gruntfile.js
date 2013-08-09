module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          hostname: '0.0.0.0',
          port: 8080,
          base: "dist"
        }
      }
    },

    copy: {
      pages: {
        files: [{
            expand: true,
            cwd: 'src/',
            src: ['**/*.html', '**/*.js', '**/*.css', '**/*.appcache'],
            dest: 'dist/'
          }
        ]
      },
      img: {
        files: [{
            expand: true,
            cwd: 'src/img/',
            src: '**',
            dest: 'dist/img/'
          }
        ]
      },
      lib: {
        files: [{
            expand: true,
            cwd: 'lib/',
            src: '**',
            dest: 'dist/lib/'
          }
        ]
      }
    },

    watch: {
      less: {
        tasks: ['less'],
        files: ['src/**/*.less']
      },
      pages: {
        tasks: ['copy:pages'],
        files: ['src/**/*.html', 'src/**/*.js', 'src/**/*.appcache']
      },
      img: {
        tasks: ['copy:img'],
        files: ['src/img/**']
      },
      lib: {
        tasks: ['copy:lib'],
        files: ['lib/**']
      }
    },

    less: {
      options: {
        concat: true
      },
      main: {
        src: 'src/**/*.less',
        dest: 'dist/main.css'
      }

    },
    clean: {
      dist: ['dist']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'copy', 'less', 'connect', 'watch']);

};