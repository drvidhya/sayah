module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 8080,
          base: "."
        }
      }
    },

    copy: {
      pages: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.html', '**/*.js', '**/*.css'],
          dest: 'dist/'
        }]
      },
      img: {
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: '**',
          dest: 'dist/img/'
        }]
      },
      lib: {
        files: [{
          expand: true,
          cwd: 'lib/',
          src: '**',
          dest: 'dist/lib/'
        }]
      }
    },

    watch: {
      pages: {
        tasks: ['copy:pages'],
        files: ['src/**/*.html', 'src/**/*.js']
      },
      css: {
        tasks: ['less'],
        files: ['src/*.less']
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
      development: {
        files: {
          "dist/main.css": "src/main.less"
        }
      }
    },
    clean: {
      dist: ['dist']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'copy', 'less', 'connect', 'watch']);

};