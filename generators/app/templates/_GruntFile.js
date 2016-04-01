module.exports = function(grunt) {
	grunt.initConfig({
		docbase: {
			def: {
				options: {
					generatePath: "build_html/",
					generateSearchIndex: true,
					generateHtml: <%= generateHtml %>,
					baseUrl: "./",
					operation: '<%= gruntOperation %>',
					urlToAccess: "http://localhost:9001/",
					assets: ['bower_components', 'styles', 'images', 'docbase-config.js'],
					checkLoadedSelector: '#navbar-collapse',
					endDocument: "<script>$(function(){  $('.search-form').searchAppbase('./search-index.json', true); $(document).ready(function(){ setTimeout(function(){ $('#folder-navbar').megaMenu(); },200); }); });</script></html>"
				}
			},
			spa: {
				options: {
					onlysearchIndex: true,
					generatePath: "build_html/",
					generateSearchIndex : true,
					generateHtml : false,
					baseUrl: "./",
					operation: '<%= gruntOperation %>',
					urlToAccess: "http://localhost:9001/",
					assets: ['example_docs', 'html', 'index.html', 'bower_components', 'styles', 'images', 'docbase-config.js', 'search-index.json' ],
					checkLoadedSelector : '#navbar-collapse'
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: './',
					protocol: 'http'
				}
			}
		},
		'gh-pages': {
			def: {
				options: {
					base: 'build_html',
					user: {
						name: 'Docbase bot',
						email: 'awesome@docba.se'
					},
					repo: <%= publishRepoLink %>,
					message: 'publish gh-pages (auto)',
					silent: false,
				},
				src: ['**']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-docbase');
	grunt.loadNpmTasks('grunt-gh-pages');

	// Default task.

	var target = grunt.option('target') || '<%= gruntTarget %>';

	grunt.registerTask('default', ['connect', 'docbase:'+target]);
	grunt.registerTask('publish', ['connect', 'docbase:'+target, 'gh-pages']);
	grunt.registerTask('spa', ['connect', 'docbase:spa']);

};
