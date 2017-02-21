/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {
//var xhttp = new XMLHttpRequest();
    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds
console.log('construing config , registrando state');



    $urlRouterProvider.otherwise("login");

//        $ocLazyLoadProvider.config(
//        {
//            // Set to true if you want to see what and when is dynamically loaded
//            debug: true
//        });
        $ocLazyLoadProvider.config({
//            debug: true
//            ,
//            modules: [
//                                        {
//                                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
//                                        },
//                                        {
//                                            name: 'oitozero.ngSweetAlert',
//                                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
//                                        },
//                                        {
//                                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
//                                        }
//                                    ]
          });

    



    $stateProvider
            .state('geslab', {
                url: "/geslab",
                templateUrl: "views/geslab/geslab_site.html",
                data: {pageTitle: 'GesLab', specialClass: 'landing-page'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['js/plugins/wow/wow.min.js']
                            },
                            {
                                files: ['css/plugins/slick/slick.css', 'css/plugins/slick/slick-theme.css', 'js/plugins/slick/slick.min.js']
                            },
                            {
                                name: 'slick',
                                files: ['js/plugins/slick/angular-slick.min.js']
                            }
                        ]);
                    }
                }
            })
            .state('tmsite', {
                url: "/tmsite",
                templateUrl: "views/tmsite/tm_site.html",
                data: {pageTitle: 'TMInformática', specialClass: 'landing-page'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['js/plugins/wow/wow.min.js']
                            },
                            {
                                files: ['css/plugins/slick/slick.css', 'css/plugins/slick/slick-theme.css', 'js/plugins/slick/slick.min.js']
                            },
                            {
                                name: 'slick',
                                files: ['js/plugins/slick/angular-slick.min.js']
                            }
                        ]);
                    }
                }
            })
            .state('cientificalab', {     //teste
                url: "/cientificalab",
                templateUrl: "views/cientificalab/cientificalab_site.html",
                data: {pageTitle: 'CientificaLab', specialClass: 'landing-page'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['js/plugins/wow/wow.min.js']
                            },
                            {
                                files: ['css/plugins/slick/slick.css', 'css/plugins/slick/slick-theme.css', 'js/plugins/slick/slick.min.js']
                            },
                            {
                                name: 'slick',
                                files: ['js/plugins/slick/angular-slick.min.js']
                            }
                        ]);
                    }
                }
            })
            .state('login', {
                url: "/login",
                templateUrl: "views/tmtelas/login.html",
                data: {pageTitle: 'Login', specialClass: 'gray-bg'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                             {
                                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                            },
                            {
                                name: 'oitozero.ngSweetAlert',
                                files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                            },
                            {
                                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                            }
                        ]);
                    }
                }
            })
            .state('widgets', {
                abstract: true,
                url: "/widgets",
                templateUrl: "views/common/content.html",
                params: {titulo: 'Widgets',pagina:'Widgets',modStCodigo: '00006',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true}
            }).state('widgets.lisnet', {
        url: "/lisnet",
        templateUrl: "views/tmtelas/widgets_lisnet.html",
        data: {pageTitle: 'Widgets'},
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        serie: true,
                        name: 'angular-flot',
                        files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js']
                    },
                    {
                        files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                    },
                    {
                        serie: true,
                        files: ['js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js', 'js/plugins/jvectormap/jquery-jvectormap-2.0.2.css']
                    },
                    {
                        serie: true,
                        files: ['js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js']
                    },
                    {
                        name: 'ui.checkbox',
                        files: ['js/bootstrap/angular-bootstrap-checkbox.js']
                    },
                    {
                        files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                    },
                    {
                        name: 'oitozero.ngSweetAlert',
                        files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                    },
                     {
                        serie: true,
                        files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                    },
                    {
                        serie: true,
                        name: 'datatables',
                        files: ['js/plugins/dataTables/angular-datatables.min.js']
                    },
                    {
                        serie: true,
                        name: 'datatables.buttons',
                        files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                    },
                    {
                        files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                    }
                ]);
            }
        }
    })
            .state('configuraperfilusuario', {
                url: "/configura/perfil",
                templateUrl: "views/tmtelas/configura_perfil_usuario.html",
                 parent: 'lisnet',
                data: {pageTitle: 'Configura Perfil', specialClass: 'gray-bg'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            })
            .state('erro', {
                url: "/erro",
                templateUrl: "views/tmtelas/under_construction.html",
                data: {pageTitle: 'Erro'}
                , resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                            },
                            {
                                name: 'oitozero.ngSweetAlert',
                                files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                            },
                            {
                                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                            }
                        ]);
                    }
                }
            }).state('contrucao', {
        abstract: true,
        url: "/contrucao",
        params: {titulo: 'Em conscrução',pagina:'Em Construção'},
        templateUrl: "views/common/content.html"
    })
            .state('contrucao.contrucao', {
                url: "/under_construction",
                templateUrl: "views/tmtelas/under_construction.html",
                parent: 'contrucao',
                data: {pageTitle: 'Em construção'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                            },
                            {
                                name: 'oitozero.ngSweetAlert',
                                files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                            },
                            {
                                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                            }
                        ]);
                    }
                }
            })
            .state('problema', {
                abstract: true,
                url: "/problema",
                templateUrl: "views/common/content.html"
            })
            .state('problema.tela_nao_existe', {
                url: "/problema.tela_nao_existe",
                templateUrl: "views/tmtelas/tela_nao_existe.html",
                parent: 'problema',
                params: {titulo: 'Tela não existe',pagina:'Tela não existe'},
                data: {pageTitle: 'Tela não existe'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                            },
                            {
                                name: 'oitozero.ngSweetAlert',
                                files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                            },
                            {
                                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                            }
                        ]);
                    }
                }
            })
            .state('controle', {
                abstract: true,
                url: "/controle",
                templateUrl: "views/common/content.html"
            }).state('controle.notificacoes', {
        url: "/notificacoes",
        templateUrl: "views/tmtelas/controle_notificacoes.html",
//            controller:"controleNotificacoes",
        params: {titulo: 'Notificações',pagina:'Notificações'},
        data: {pageTitle: 'Notificações'},
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        serie: true,
                        files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                    },
                    {
                        serie: true,
                        name: 'datatables',
                        files: ['js/plugins/dataTables/angular-datatables.min.js']
                    },
                    {
                        serie: true,
                        name: 'datatables.buttons',
                        files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                    },
                    {
                        files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                    },
                    {
                        name: 'oitozero.ngSweetAlert',
                        files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                    }
                ]);
            }
        }
    }).state('lisnet', {
                abstract: true,
                url: "/lisnet",
                templateUrl: "views/common/content.html"
            })
            .state('consultadelaudos', {
                url: "/consulta/laudo/:userDTO",
                templateUrl: "views/tmtelas/consulta_laudos.html",
                parent: 'lisnet',
                params: {titulo: 'Consulta de Laudos',pai:'Consulta',filho:'Laudos',pagina:'Consulta de Laudos',limit:'500'},
                data: {pageTitle: 'Consulta de Laudos'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaComplexa());
                    }
                }
            })
            .state('estatisticafaturamento', {
                url: "/faturamento/:userDTO",
                templateUrl: "views/tmtelas/estatistica_faturamento.html",
                parent: 'lisnet',
                controller: 'estatisticaFaturamento',
                params: {titulo: 'Estatística Faturamento',pai:'Estatística',pagina:'Estatística Faturamento'},
                data: {pageTitle: 'Estatística Faturamento'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                serie: true,
                                files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                            },
                            {
                                serie: true,
                                name: 'datatables',
                                files: ['js/plugins/dataTables/angular-datatables.min.js']
                            },
                            {
                                serie: true,
                                name: 'datatables.buttons',
                                files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                            },
                            {
                                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                            },
                            {
                                name: 'oitozero.ngSweetAlert',
                                files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                            },
                            {
                                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                            }

                        ]);
                    }
                }
            })
            .state('sobre', {
                url: "/sobre",
                templateUrl: "views/tmtelas/ajuda.html",
                parent: 'lisnet',
                params: {titulo: 'Sobre o LisNet e a Geslab',pai:'Ajuda',pagina:'Sobre o LisNet e a Geslab'},
                data: {pageTitle: 'Sobre'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                            },
                            {
                                name: 'oitozero.ngSweetAlert',
                                files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                            },
                            {
                                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                            }

                        ]);
                    }
                }
            })
//            .state('estatisticaporconvenio-unidade', {
//                url: "/estatistica/conveniounidade",
//                templateUrl: "views/tmtelas/relatorio_unidade_convenio.html",
//                parent: 'lisnet',
//                params: {titulo: 'Estatística por Convênio/Unidade',pai:'Estatística',pagina:'Estatística por Convênio/Unidade'},
//                data: {pageTitle: 'Estatística por Convênio/Unidade', specialClass: 'gray-bg'},
//                resolve: {
//                    loadPlugin: function ($ocLazyLoad) {
//                        return $ocLazyLoad.load(telaPadraoLazyLoad());
//                            }
//                }
//            })
             .state('cadastrodepacientes', {
                url: "/cadastro/pacientes/",
                templateUrl: "views/tmtelas/cadastro_paciente.html",
                params: {titulo: 'Cadastro de Paciente',pai:'Cadastro',pagina:'Cadastro de Paciente', modStCodigo: '00220',limit:'500'},
                parent: 'lisnet',
                data: {pageTitle: 'Cadastro de Paciente'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load( telaComplexa());
                    }
                }
            })
          
            .state('cadastrodepacientes.constroe_paciente', {
                url: 'constroe_paciente',
                templateUrl: 'views/tmtelas/cadastro_paciente_constroe_paciente.html',
                data: {pageTitle: 'Constroe Paciente',state: 'cadastrodepacientes.constroe_paciente'}
            })
            .state('cadastrodepacientes.constroe_requisicao', {
                url: 'constroe_requisicao',
                templateUrl: 'views/tmtelas/cadastro_paciente_constroe_requisicao.html',
                data: {pageTitle: 'Constroe Requisição',state: 'cadastrodepacientes.constroe_requisicao'}
            })
            .state('cadastrodepacientes.dados_complementares', {
                url: 'dados_complementares',
                templateUrl: 'views/tmtelas/cadastro_paciente_constroe_requisicao_dados_complementares.html',
                data: {pageTitle: 'Dados Complementares',state: 'cadastrodepacientes.dados_complementares'}
            })
            .state('cadastrodepacientes.inclue_exames', {
                url: 'inclue_exames',
                templateUrl: 'views/tmtelas/cadastro_paciente_constroe_requisicao_exames.html',
                data: {pageTitle: 'Incluir Exames',state: 'cadastrodepacientes.inclue_exames'}
            })
            .state('convenios', {
                url: "/configura/convenios/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Convênios',pai:'Configura',pagina:'Convênios', modStCodigo: '00006',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Convênios'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load( telaPadraoLazyLoad());
                    }
                }
            }).state('material', {
                url: "/configura/materiais/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Material',pai:'Configura',pagina:'Material', modStCodigo: '00013',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Materiais'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('setores', {
                url: "/configura/setores/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Setores',pai:'Configura',pagina:'Setores',modStCodigo: '00015',limit:'200',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Setores'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('antibiotico', {
                url: "/configura/antibioticos/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Antibiótico',pai:'Configura',pagina:'Antibiótico', modStCodigo: '00016',limit:'250',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Antibioticos'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('bacteriasfungosevirus', {
                url: "/configura/bacteriasfungosevirus/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Bactéria,Fungo & Virús',pai:'Configura',pagina:'Bactéria,Fungo & Virús',modStCodigo: '00017',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
//                            controller: 'consultaLaudos',
                data: {pageTitle: 'Bacterias Fungos e Virus'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('cid', {
                url: "/configura/cid/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'CID',pai:'Configura',pagina:'CID', modStCodigo: '00018',limit:'500',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'CID'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('feriado', {
                url: "/configura/feriado/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Feriado',pai:'Configura',pagina:'Feriado', modStCodigo: '00021',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Feriado'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('frasesparalaudo', {
                url: "/configura/frasesparalaudo/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Frase para Laudo',pai:'Configura',pagina:'Frase para Laudo', modStCodigo: '00022',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Frases para Laudo'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('metodo', {
                url: "/configura/metodo/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Método',pai:'Configura',pagina:'Método', modStCodigo: '00023',limit:'500',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Método'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('motivo', {
                url: "/configura/motivo/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Motivo',pai:'Configura',pagina:'Motivo', modStCodigo: '00024',limit:'500',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Motivo'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('observacao', {
                url: "/configura/observacao/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Observação',pai:'Configura',pagina:'Observação',modStCodigo: '00025',limit:'30',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Observação'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('parasitas', {
                url: "/configura/parasitas/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Parasitas',pai:'Configura',pagina:'Parasitas',modStCodigo: '00027',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Parasitas'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            })
//                    .state('statusamostras', {
//                url: "/configura/statusamostras/",
//                templateUrl: "views/tmtelas/tela_padrao.html",
//                params: { modStCodigo: '00028',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
//                parent: 'lisnet',
//                data: {pageTitle: 'Status Amostras'}, resolve: {
//                    loadPlugin: function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            {
//                                serie: true,
//                                files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
//                            },
//                            {
//                                serie: true,
//                                name: 'datatables',
//                                files: ['js/plugins/dataTables/angular-datatables.min.js']
//                            },
//                            {
//                                serie: true,
//                                name: 'datatables.buttons',
//                                files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
//                            },
//                            {
//                                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
//                            },
//                            {
//                                name: 'oitozero.ngSweetAlert',
//                                files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
//                            },
//                            {
//                                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
//                            }
//
//                        ]);
//                    }
//                }
//            })
//                    .state('questionario', {
//                url: "/configura/questionario/",
//                templateUrl: "views/tmtelas/tela_padrao.html",
//                params: { modStCodigo: '00029',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
//                parent: 'lisnet',
//                data: {pageTitle: 'Questionário'}, resolve: {
//                    loadPlugin: function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            {
//                                serie: true,
//                                files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
//                            },
//                            {
//                                serie: true,
//                                name: 'datatables',
//                                files: ['js/plugins/dataTables/angular-datatables.min.js']
//                            },
//                            {
//                                serie: true,
//                                name: 'datatables.buttons',
//                                files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
//                            },
//                            {
//                                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
//                            },
//                            {
//                                name: 'oitozero.ngSweetAlert',
//                                files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
//                            },
//                            {
//                                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
//                            }
//
//                        ]);
//                    }
//                }
//            })
//                    .state('prazo', {
//                url: "/configura/prazo/",
//                templateUrl: "views/tmtelas/tela_padrao.html",
//                params: { modStCodigo: '00030',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
//                parent: 'lisnet',
//                data: {pageTitle: 'Prazo'}, resolve: {
//                    loadPlugin: function ($ocLazyLoad) {
//                        return $ocLazyLoad.load([
//                            {
//                                serie: true,
//                                files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
//                            },
//                            {
//                                serie: true,
//                                name: 'datatables',
//                                files: ['js/plugins/dataTables/angular-datatables.min.js']
//                            },
//                            {
//                                serie: true,
//                                name: 'datatables.buttons',
//                                files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
//                            },
//                            {
//                                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
//                            },
//                            {
//                                name: 'oitozero.ngSweetAlert',
//                                files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
//                            },
//                            {
//                                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
//                            }
//
//                        ]);
//                    }
//                }
//            })
                    .state('recipiente', {
                url: "/configura/recipiente/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Recipiente',pai:'Configura',pagina:'Recipiente',modStCodigo: '00031',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Recipiente'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('solicitantes', {
                url: "/configura/solicitantes/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Solicitantes',pai:'Configura',pagina:'Solicitantes', modStCodigo: '00044',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Solicitantes'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('profissoes', {
                url: "/configura/profissoes/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Profissões',pai:'Configura',pagina:'Profissões',modStCodigo: '00046',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Profissões'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('unidadesdemedida', {
                url: "/configura/unidadesdemedida/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Unidade de Medida',pai:'Configura',pagina:'Unidade de Medida',modStCodigo: '00053',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Unidade de Medida'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('mapadeantibioticos', {
                url: "/configura/mapadeantibioticos/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Mapa de Antibióticos',pai:'Configura',pagina:'Mapa de Antibióticos', modStCodigo: '00054',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Mapa de Antibióticos'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('laboratoriodeapoio', {
                url: "/configura/laboratoriodeapoio/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Laboratório de Apoio',pai:'Configura',pagina:'Laboratório de Apoio', modStCodigo: '00057',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Laboratório de Apoio'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('coletores', {
                url: "/configura/coletores/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Coletores',pai:'Configura',pagina:'Coletores',  modStCodigo: '00058',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Coletores'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('localdeentrega', {
                url: "/configura/localdeentrega/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Local de Entrega',pai:'Configura',pagina:'Local de Entrega', modStCodigo: '00059',limit:'300',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Local de Entrega'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('textoparalaudos', {
                url: "/configura/textoparalaudos/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Texto para Laudo',pai:'Configura',pagina:'Texto para Laudo',  modStCodigo: '00060',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Texto para Laudos'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('mapaamostra', {
                url: "/configura/mapaamostra/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Mapa de Amostra',pai:'Configura',pagina:'Mapa de Amostra',  modStCodigo: '00073',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Mapa Amostra'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('grupo', {
                url: "/configura/grupo/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Grupo',pai:'Configura',pagina:'Grupo',  modStCodigo: '00088',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Grupo'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('examedepara', {
                url: "/configura/examedepara/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Exame Depara',pai:'Configura',pagina:'Exame Depara', modStCodigo: '00090',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Exame Depara'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('grupodetriagem', {
                url: "/configura/grupodetriagem/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Grupo de Triagem',pai:'Configura',pagina:'Grupo de Triagem' , modStCodigo: '00098',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Grupo de Triagem'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('localde-para', {
                url: "/configura/localdepara/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Local Depara',pai:'Configura',pagina:'Local Depara' , modStCodigo: '00101',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Local depara'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('examedepararetorno', {
                url: "/configura/examedepararetorno/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Exame Depara Retorno',pai:'Configura',pagina:'Exame Depara Retorno' , modStCodigo: '00131',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Exame de para Retorno'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('materialde-para', {
                url: "/configura/materialdepara/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Material Depara',pai:'Configura',pagina:'Material Depara' ,  modStCodigo: '00133',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Material Depara'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('materialdecoleta(dasa)', {
                url: "/configura/materialdecoleta-dasa/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Material de Coleta',pai:'Configura',pagina:'Material de Coleta' , modStCodigo: '00138',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Material de Coleta(DASA)'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('recipientedecoleta(dasa)', {
                url: "/configura/recipientedecoleta-dasa/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Recipiente de Coleta',pai:'Configura',pagina:'Recipiente de Coleta' ,modStCodigo: '00139',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Recipiente de Coleta(DASA)'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('cadastrodecarros', {
                url: "/configura/cadastrodecarros/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Cadastro de Carros',pai:'Configura',pagina:'Cadastro de Carros' , modStCodigo: '00159',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Cadastro de Carros'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('procedimentodecoleta', {
                url: "/configura/procedimentodecoleta/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Procedimento de Coleta',pai:'Configura',pagina:'Procedimento de Coleta' , modStCodigo: '00161',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Procedimento de Coleta'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('bandejamento', {
                url: "/configura/bandejamento/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Badejamento',pai:'Configura',pagina:'Badejamento' , modStCodigo: '00179',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Bandejamento'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('flyer', {
                url: "/configura/flyer/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Flyer',pai:'Configura',pagina:'Flyer' ,  modStCodigo: '00184',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Flyer'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('cadastrosparasoroteca', {
                url: "/configura/cadastrosparasoroteca/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Cadastro para Soroteca',pai:'Configura',pagina:'Cadastro para Soroteca' ,  modStCodigo: '00185',limit:'50',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Cadastros para Soroteca'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('cadastrodesistemas', {
                url: "/configura/cadastrodesistemas/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Cadastro de Sistemas',pai:'Configura',pagina:'Cadastro de Sistemas' ,  modStCodigo: '00187',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Cadastro de Sistemas'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('grupodeantibioticos', {
                url: "/configura/grupodeantibioticos/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Grupo de Antibióticos',pai:'Configura',pagina:'Grupo de Antibióticos' ,modStCodigo: '00190',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Grupo de Antibioticos'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('laudopadrao', {
                url: "/configura/laudopadrao/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Laudo Padrão',pai:'Configura',pagina:'Laudo Padrão' , modStCodigo: '00194',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Laudo Padrao'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('usuarioxconvenio', {
                url: "/configura/usuarioxconvenio/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Usuário x Convênio',pai:'Configura',pagina:'Usuário x Convênio' ,  modStCodigo: '00199',limit:'220',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Usuário x Convênio'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('periododefechamento', {
                url: "/configura/periododefechamento/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Período de Fechamento',pai:'Configura',pagina:'Período de Fechamento' ,modStCodigo: '00229',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Periodo de Fechamento'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            }).state('fraselaudo', {
                url: "/configura/fraselaudo/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Frase do Laudo',pai:'Configura',pagina:'Frase do Laudo' ,modStCodigo: '00251',limit:'100',btnFiltrar:true,btnCriar:true,btnTodos:true},
                parent: 'lisnet',
                data: {pageTitle: 'Frase Laudo'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaPadraoLazyLoad());
                    }
                }
            });

        
        
//        for (var i = 0; i < menuJson.length; i++) {
//        var _pai = menuJson[i];
//        $stateProvider
//                .state(_pai.stateN, {
//                    abstract: true,
//                    url: "/" + _pai.state,
//                    templateUrl: "views/common/content.html"
//                });
//                if(_pai.telas){
//                    for(var x = 0; x < _pai.telas.length ; x ++){
//                        var _filho = _pai.telas[x];
//                                $stateProvider.state(_filho.stateN, {
//                            url: "/"+_filho.state,
//                            templateUrl: "views/under_construction.html",
//                            parent:_pai.stateN,
//                            data: { pageTitle: '404'}  ,resolve: {
//                                loadPlugin: function ($ocLazyLoad) {
//                                    return $ocLazyLoad.load([
//                                        {
//                                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
//                                        },
//                                        {
//                                            name: 'oitozero.ngSweetAlert',
//                                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
//                                        },
//                                        {
//                                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
//                                        }
//                                    ]);
//                                }
//                            }
//                        });
//                    }
//                }
//    }
        
//        .state('00001', {
//            abstract: true,
//            url: "/00001",
//            templateUrl: "views/common/content.html"
//        })
//        .state('00001.00227', {
//            url: "/00193",
//            templateUrl: "views/form_basic.html",
//            parent: "00001",
//            data: { pageTitle: '404', specialClass: 'gray-bg' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('00001.00223', {
//            url: "/00223",
//            templateUrl: "views/form_basic.html",
//            parent: "00001",
//            data: { pageTitle: '404', specialClass: 'gray-bg' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
//                        }
//                    ]);
//                }
//            }
//        });
        
//        .state('dashboards', {
//            abstract: true,
//            url: "/dashboards",
//            templateUrl: "views/common/content.html",
//        })
//        .state('dashboards.dashboard_1', {
//            url: "/dashboard_1",
//            templateUrl: "views/dashboard_1.html",
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//
//                            serie: true,
//                            name: 'angular-flot',
//                            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
//                        },
//                        {
//                            name: 'angles',
//                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
//                        },
//                        {
//                            name: 'angular-peity',
//                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
//                        },
//                            {
//                                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
//                            },
//                            {
//                                name: 'oitozero.ngSweetAlert',
//                                files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
//                            }
//                    ]);
//                }
//            }
//        })
//        .state('dashboards.dashboard_2', {
//            url: "/dashboard_2",
//            templateUrl: "views/dashboard_2.html",
//            data: { pageTitle: 'Dashboard 2' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            name: 'angular-flot',
//                            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
//                        },
//                        {
//                            serie: true,
//                            files: ['js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js', 'js/plugins/jvectormap/jquery-jvectormap-2.0.2.css']
//                        },
//                        {
//                            serie: true,
//                            files: ['js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js']
//                        },
//                        {
//                            name: 'ui.checkbox',
//                            files: ['js/bootstrap/angular-bootstrap-checkbox.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('dashboards.dashboard_3', {
//            url: "/dashboard_3",
//            templateUrl: "views/dashboard_3.html",
//            data: { pageTitle: 'Dashboard 3' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'angles',
//                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
//                        },
//                        {
//                            name: 'angular-peity',
//                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
//                        },
//                        {
//                            name: 'ui.checkbox',
//                            files: ['js/bootstrap/angular-bootstrap-checkbox.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('dashboards_top', {
//            abstract: true,
//            url: "/dashboards_top",
//            templateUrl: "views/common/content_top_navigation.html",
//        })
//        .state('dashboards_top.dashboard_4', {
//            url: "/dashboard_4",
//            templateUrl: "views/dashboard_4.html",
//            data: { pageTitle: 'Dashboard 4' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'angles',
//                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
//                        },
//                        {
//                            name: 'angular-peity',
//                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
//                        },
//                        {
//                            serie: true,
//                            name: 'angular-flot',
//                            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('dashboards.dashboard_4_1', {
//            url: "/dashboard_4_1",
//            templateUrl: "views/dashboard_4_1.html",
//            data: { pageTitle: 'Dashboard 4' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'angles',
//                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
//                        },
//                        {
//                            name: 'angular-peity',
//                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
//                        },
//                        {
//                            serie: true,
//                            name: 'angular-flot',
//                            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('dashboards.dashboard_5', {
//            url: "/dashboard_5",
//            templateUrl: "views/dashboard_5.html",
//            data: { pageTitle: 'Dashboard 5' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            name: 'angular-flot',
//                            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
//                        },
//                        {
//                            files: ['js/plugins/sparkline/jquery.sparkline.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        
//        .state('layouts', {
//            url: "/layouts",
//            templateUrl: "views/layouts.html",
//            data: { pageTitle: 'Layouts' },
//        })
//        .state('charts', {
//            abstract: true,
//            url: "/charts",
//            templateUrl: "views/common/content.html",
//        })
//        .state('charts.flot_chart', {
//            url: "/flot_chart",
//            templateUrl: "views/graph_flot.html",
//            data: { pageTitle: 'Flot chart' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            name: 'angular-flot',
//                            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('charts.rickshaw_chart', {
//            url: "/rickshaw_chart",
//            templateUrl: "views/graph_rickshaw.html",
//            data: { pageTitle: 'Rickshaw chart' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            reconfig: true,
//                            serie: true,
//                            files: ['js/plugins/rickshaw/vendor/d3.v3.js','js/plugins/rickshaw/rickshaw.min.js']
//                        },
//                        {
//                            reconfig: true,
//                            name: 'angular-rickshaw',
//                            files: ['js/plugins/rickshaw/angular-rickshaw.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('charts.peity_chart', {
//            url: "/peity_chart",
//            templateUrl: "views/graph_peity.html",
//            data: { pageTitle: 'Peity graphs' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'angular-peity',
//                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('charts.sparkline_chart', {
//            url: "/sparkline_chart",
//            templateUrl: "views/graph_sparkline.html",
//            data: { pageTitle: 'Sparkline chart' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/sparkline/jquery.sparkline.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('charts.chartjs_chart', {
//            url: "/chartjs_chart",
//            templateUrl: "views/chartjs.html",
//            data: { pageTitle: 'Chart.js' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/chartJs/Chart.min.js']
//                        },
//                        {
//                            name: 'angles',
//                            files: ['js/plugins/chartJs/angles.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('charts.chartist_chart', {
//            url: "/chartist_chart",
//            templateUrl: "views/chartist.html",
//            data: { pageTitle: 'Chartist' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            name: 'angular-chartist',
//                            files: ['js/plugins/chartist/chartist.min.js', 'css/plugins/chartist/chartist.min.css', 'js/plugins/chartist/angular-chartist.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('charts.c3charts', {
//            url: "/c3charts",
//            templateUrl: "views/c3charts.html",
//            data: { pageTitle: 'c3charts' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            files: ['css/plugins/c3/c3.min.css', 'js/plugins/d3/d3.min.js', 'js/plugins/c3/c3.min.js']
//                        },
//                        {
//                            serie: true,
//                            name: 'gridshore.c3js.chart',
//                            files: ['js/plugins/c3/c3-angular.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('mailbox', {
//            abstract: true,
//            url: "/mailbox",
//            templateUrl: "views/common/content.html",
//        })
//        .state('mailbox.inbox', {
//            url: "/inbox",
//            templateUrl: "views/mailbox.html",
//            data: { pageTitle: 'Mail Inbox' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('mailbox.email_view', {
//            url: "/email_view",
//            templateUrl: "views/mail_detail.html",
//            data: { pageTitle: 'Mail detail' }
//        })
//        .state('mailbox.email_compose', {
//            url: "/email_compose",
//            templateUrl: "views/mail_compose.html",
//            data: { pageTitle: 'Mail compose' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js']
//                        },
//                        {
//                            name: 'summernote',
//                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js','js/plugins/summernote/angular-summernote.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('mailbox.email_template', {
//            url: "/email_template",
//            templateUrl: "views/email_template.html",
//            data: { pageTitle: 'Mail compose' }
//        })
//        .state('widgets', {
//            url: "/widgets",
//            templateUrl: "views/widgets.html",
//            data: { pageTitle: 'Widhets' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            name: 'angular-flot',
//                            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
//                        },
//                        {
//                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
//                        },
//                        {
//                            serie: true,
//                            files: ['js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js', 'js/plugins/jvectormap/jquery-jvectormap-2.0.2.css']
//                        },
//                        {
//                            serie: true,
//                            files: ['js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js']
//                        },
//                        {
//                            name: 'ui.checkbox',
//                            files: ['js/bootstrap/angular-bootstrap-checkbox.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('metrics', {
//            url: "/metrics",
//            templateUrl: "views/metrics.html",
//            data: { pageTitle: 'Metrics' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/sparkline/jquery.sparkline.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('forms', {
//            abstract: true,
//            url: "/forms",
//            templateUrl: "views/common/content.html",
//        })
//        .state('forms.basic_form', {
//            url: "/basic_form",
//            templateUrl: "views/form_basic.html",
//            data: { pageTitle: 'Basic form' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('forms.advanced_plugins', {
//            url: "/advanced_plugins",
//            templateUrl: "views/form_advanced.html",
//            data: { pageTitle: 'Advanced form' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/moment/moment.min.js']
//                        },
//                        {
//                            name: 'ui.knob',
//                            files: ['js/plugins/jsKnob/jquery.knob.js','js/plugins/jsKnob/angular-knob.js']
//                        },
//                        {
//                            files: ['css/plugins/ionRangeSlider/ion.rangeSlider.css','css/plugins/ionRangeSlider/ion.rangeSlider.skinFlat.css','js/plugins/ionRangeSlider/ion.rangeSlider.min.js']
//                        },
//                        {
//                            insertBefore: '#loadBefore',
//                            name: 'localytics.directives',
//                            files: ['css/plugins/chosen/bootstrap-chosen.css','js/plugins/chosen/chosen.jquery.js','js/plugins/chosen/chosen.js']
//                        },
//                        {
//                            name: 'nouislider',
//                            files: ['css/plugins/nouslider/jquery.nouislider.css','js/plugins/nouslider/jquery.nouislider.min.js','js/plugins/nouslider/angular-nouislider.js']
//                        },
//                        {
//                            name: 'datePicker',
//                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js']
//                        },
//                        {
//                            files: ['js/plugins/jasny/jasny-bootstrap.min.js']
//                        },
//                        {
//                            files: ['css/plugins/clockpicker/clockpicker.css', 'js/plugins/clockpicker/clockpicker.js']
//                        },
//                        {
//                            name: 'ui.switchery',
//                            files: ['css/plugins/switchery/switchery.css','js/plugins/switchery/switchery.js','js/plugins/switchery/ng-switchery.js']
//                        },
//                        {
//                            name: 'colorpicker.module',
//                            files: ['css/plugins/colorpicker/colorpicker.css','js/plugins/colorpicker/bootstrap-colorpicker-module.js']
//                        },
//                        {
//                            name: 'ngImgCrop',
//                            files: ['js/plugins/ngImgCrop/ng-img-crop.js','css/plugins/ngImgCrop/ng-img-crop.css']
//                        },
//                        {
//                            serie: true,
//                            files: ['js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
//                        },
//                        {
//                            name: 'daterangepicker',
//                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
//                        },
//                        {
//                            files: ['css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css']
//                        },
//                        {
//                            name: 'ui.select',
//                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
//                        },
//                        {
//                            files: ['css/plugins/touchspin/jquery.bootstrap-touchspin.min.css', 'js/plugins/touchspin/jquery.bootstrap-touchspin.min.js']
//                        },
//                        {
//                            name: 'ngTagsInput',
//                            files: ['js/plugins/ngTags//ng-tags-input.min.js', 'css/plugins/ngTags/ng-tags-input-custom.min.css']
//                        },
//                        {
//                            files: ['js/plugins/dualListbox/jquery.bootstrap-duallistbox.js','css/plugins/dualListbox/bootstrap-duallistbox.min.css']
//                        },
//                        {
//                            name: 'frapontillo.bootstrap-duallistbox',
//                            files: ['js/plugins/dualListbox/angular-bootstrap-duallistbox.js']
//                        }
//
//                    ]);
//                }
//            }
//        })
//        .state('forms.wizard', {
//            url: "/wizard",
//            templateUrl: "views/form_wizard.html",
//            controller: wizardCtrl,
//            data: { pageTitle: 'Wizard form' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/steps/jquery.steps.css']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('forms.wizard.step_one', {
//            url: '/step_one',
//            templateUrl: 'views/wizard/step_one.html',
//            data: { pageTitle: 'Wizard form' }
//        })
//        .state('forms.wizard.step_two', {
//            url: '/step_two',
//            templateUrl: 'views/wizard/step_two.html',
//            data: { pageTitle: 'Wizard form' }
//        })
//        .state('forms.wizard.step_three', {
//            url: '/step_three',
//            templateUrl: 'views/wizard/step_three.html',
//            data: { pageTitle: 'Wizard form' }
//        })
//        .state('forms.file_upload', {
//            url: "/file_upload",
//            templateUrl: "views/form_file_upload.html",
//            data: { pageTitle: 'File upload' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/dropzone/basic.css','css/plugins/dropzone/dropzone.css','js/plugins/dropzone/dropzone.js']
//                        },
//                        {
//                            files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css' ]
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('forms.text_editor', {
//            url: "/text_editor",
//            templateUrl: "views/form_editors.html",
//            data: { pageTitle: 'Text editor' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'summernote',
//                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js','js/plugins/summernote/angular-summernote.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('forms.autocomplete', {
//            url: "/autocomplete",
//            templateUrl: "views/autocomplete.html",
//            data: { pageTitle: 'Autocomplete' }
//
//        })
//        .state('forms.markdown', {
//            url: "/markdown",
//            templateUrl: "views/markdown.html",
//            data: { pageTitle: 'Markdown' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            files: ['js/plugins/bootstrap-markdown/bootstrap-markdown.js','js/plugins/bootstrap-markdown/markdown.js','css/plugins/bootstrap-markdown/bootstrap-markdown.min.css']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('app', {
//            abstract: true,
//            url: "/app",
//            templateUrl: "views/common/content.html",
//        })
//        .state('app.contacts', {
//            url: "/contacts",
//            templateUrl: "views/contacts.html",
//            data: { pageTitle: 'Contacts' }
//        })
//        .state('app.contacts_2', {
//            url: "/contacts_2",
//            templateUrl: "views/contacts_2.html",
//            data: { pageTitle: 'Contacts 2' }
//        })
//        .state('app.profile', {
//            url: "/profile",
//            templateUrl: "views/profile.html",
//            data: { pageTitle: 'Profile' }
//        })
//        .state('app.profile_2', {
//            url: "/profile_2",
//            templateUrl: "views/profile_2.html",
//            data: { pageTitle: 'Profile_2'},
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/sparkline/jquery.sparkline.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('app.projects', {
//            url: "/projects",
//            templateUrl: "views/projects.html",
//            data: { pageTitle: 'Projects' }
//        })
//        .state('app.project_detail', {
//            url: "/project_detail",
//            templateUrl: "views/project_detail.html",
//            data: { pageTitle: 'Project detail' }
//        })
//        .state('app.file_manager', {
//            url: "/file_manager",
//            templateUrl: "views/file_manager.html",
//            data: { pageTitle: 'File manager' }
//        })
//        .state('app.calendar', {
//            url: "/calendar",
//            templateUrl: "views/calendar.html",
//            data: { pageTitle: 'Calendar' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            insertBefore: '#loadBefore',
//                            files: ['css/plugins/fullcalendar/fullcalendar.css','js/plugins/fullcalendar/fullcalendar.min.js','js/plugins/fullcalendar/gcal.js']
//                        },
//                        {
//                            name: 'ui.calendar',
//                            files: ['js/plugins/fullcalendar/calendar.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('app.faq', {
//            url: "/faq",
//            templateUrl: "views/faq.html",
//            data: { pageTitle: 'FAQ' }
//        })
//        .state('app.timeline', {
//            url: "/timeline",
//            templateUrl: "views/timeline.html",
//            data: { pageTitle: 'Timeline' }
//        })
//        .state('app.pin_board', {
//            url: "/pin_board",
//            templateUrl: "views/pin_board.html",
//            data: { pageTitle: 'Pin board' }
//        })
//        .state('app.invoice', {
//            url: "/invoice",
//            templateUrl: "views/invoice.html",
//            data: { pageTitle: 'Invoice' }
//        })
//        .state('app.blog', {
//            url: "/blog",
//            templateUrl: "views/blog.html",
//            data: { pageTitle: 'Blog' }
//        })
//        .state('app.article', {
//            url: "/article",
//            templateUrl: "views/article.html",
//            data: { pageTitle: 'Article' }
//        })
//        .state('app.issue_tracker', {
//            url: "/issue_tracker",
//            templateUrl: "views/issue_tracker.html",
//            data: { pageTitle: 'Issue Tracker' }
//        })
//        .state('app.clients', {
//            url: "/clients",
//            templateUrl: "views/clients.html",
//            data: { pageTitle: 'Clients' }
//        })
//        .state('app.teams_board', {
//            url: "/teams_board",
//            templateUrl: "views/teams_board.html",
//            data: { pageTitle: 'Teams board' }
//        })
//        .state('app.social_feed', {
//            url: "/social_feed",
//            templateUrl: "views/social_feed.html",
//            data: { pageTitle: 'Social feed' }
//        })
//        .state('app.vote_list', {
//            url: "/vote_list",
//            templateUrl: "views/vote_list.html",
//            data: { pageTitle: 'Vote list' }
//        })
//        .state('pages', {
//            abstract: true,
//            url: "/pages",
//            templateUrl: "views/common/content.html"
//        })
//        .state('pages.search_results', {
//            url: "/search_results",
//            templateUrl: "views/search_results.html",
//            data: { pageTitle: 'Search results' }
//        })
//        .state('pages.empy_page', {
//            url: "/empy_page",
//            templateUrl: "views/empty_page.html",
//            data: { pageTitle: 'Empty page' }
//        })
//        .state('login', {
//            url: "/login",
//            templateUrl: "views/login.html",
//            data: { pageTitle: 'Login', specialClass: 'gray-bg' }
//            ,resolve: {
//                                loadPlugin: function ($ocLazyLoad) {
//                                    return $ocLazyLoad.load([
//                                        {
//                                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
//                                        },
//                                        {
//                                            name: 'oitozero.ngSweetAlert',
//                                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
//                                        },
//                                        {
//                                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
//                                        }
//                                    ]);
//                                }
//                            }
//        })
//        .state('login_two_columns', {
//            url: "/login_two_columns",
//            templateUrl: "views/login_two_columns.html",
//            data: { pageTitle: 'Login two columns', specialClass: 'gray-bg' }
//        })
//        .state('register', {
//            url: "/register",
//            templateUrl: "views/register.html",
//            data: { pageTitle: 'Register', specialClass: 'gray-bg' }
//        })
//        .state('lockscreen', {
//            url: "/lockscreen",
//            templateUrl: "views/lockscreen.html",
//            data: { pageTitle: 'Lockscreen', specialClass: 'gray-bg' }
//        })
//        .state('forgot_password', {
//            url: "/forgot_password",
//            templateUrl: "views/forgot_password.html",
//            data: { pageTitle: 'Forgot password', specialClass: 'gray-bg' }
//        })
//        .state('errorOne', {
//            url: "/errorOne",
//            templateUrl: "views/errorOne.html",
//            data: { pageTitle: '404', specialClass: 'gray-bg' }
//        })
//        .state('errorTwo', {
//            url: "/errorTwo",
//            templateUrl: "views/errorTwo.html",
//            data: { pageTitle: '500', specialClass: 'gray-bg' }
//        })
//        .state('ui', {
//            abstract: true,
//            url: "/ui",
//            templateUrl: "views/common/content.html",
//        })
//        .state('ui.typography', {
//            url: "/typography",
//            templateUrl: "views/typography.html",
//            data: { pageTitle: 'Typography' }
//        })
//        .state('ui.icons', {
//            url: "/icons",
//            templateUrl: "views/icons.html",
//            data: { pageTitle: 'Icons' }
//        })
//        .state('ui.buttons', {
//            url: "/buttons",
//            templateUrl: "views/buttons.html",
//            data: { pageTitle: 'Buttons' }
//        })
//        .state('ui.tabs_panels', {
//            url: "/tabs_panels",
//            templateUrl: "views/tabs_panels.html",
//            data: { pageTitle: 'Panels' }
//        })
//        .state('ui.tabs', {
//            url: "/tabs",
//            templateUrl: "views/tabs.html",
//            data: { pageTitle: 'Tabs' }
//        })
//        .state('ui.notifications_tooltips', {
//            url: "/notifications_tooltips",
//            templateUrl: "views/notifications.html",
//            data: { pageTitle: 'Notifications and tooltips' }
//        })
//        .state('ui.helper_classes', {
//            url: "/helper_classes",
//            templateUrl: "views/helper_classes.html",
//            data: { pageTitle: 'Helper css classes' }
//        })
//        .state('ui.badges_labels', {
//            url: "/badges_labels",
//            templateUrl: "views/badges_labels.html",
//            data: { pageTitle: 'Badges and labels and progress' }
//        })
//        .state('ui.video', {
//            url: "/video",
//            templateUrl: "views/video.html",
//            data: { pageTitle: 'Responsible Video' }
//        })
//        .state('ui.draggable', {
//            url: "/draggable",
//            templateUrl: "views/draggable.html",
//            data: { pageTitle: 'Draggable panels' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'ui.sortable',
//                            files: ['js/plugins/ui-sortable/sortable.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('grid_optionss', {
//            url: "/grid_options",
//            templateUrl: "views/grid_options.html",
//            data: { pageTitle: 'Grid options' }
//        })
//        .state('miscellaneous', {
//            abstract: true,
//            url: "/miscellaneous",
//            templateUrl: "views/common/content.html",
//        })
//        .state('miscellaneous.google_maps', {
//            url: "/google_maps",
//            templateUrl: "views/google_maps.html",
//            data: { pageTitle: 'Google maps' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'ui.event',
//                            files: ['js/plugins/uievents/event.js']
//                        },
//                        {
//                            name: 'ui.map',
//                            files: ['js/plugins/uimaps/ui-map.js']
//                        },
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.datamaps', {
//            url: "/datamaps",
//            templateUrl: "views/datamaps.html",
//            data: { pageTitle: 'Datamaps' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/d3/d3.min.js','js/plugins/topojson/topojson.js','js/plugins/datamaps/datamaps.all.min.js']
//                        },
//                        {
//                            name: 'datamaps',
//                            files: ['js/plugins/angular-datamaps/angular-datamaps.min.js']
//                        },
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.socialbuttons', {
//            url: "/socialbuttons",
//            templateUrl: "views/socialbuttons.html",
//            data: { pageTitle: 'Social buttons' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/bootstrapSocial/bootstrap-social.css']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.code_editor', {
//            url: "/code_editor",
//            templateUrl: "views/code_editor.html",
//            data: { pageTitle: 'Code Editor' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            files: ['css/plugins/codemirror/codemirror.css','css/plugins/codemirror/ambiance.css','js/plugins/codemirror/codemirror.js','js/plugins/codemirror/mode/javascript/javascript.js']
//                        },
//                        {
//                            name: 'ui.codemirror',
//                            files: ['js/plugins/ui-codemirror/ui-codemirror.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.modal_window', {
//            url: "/modal_window",
//            templateUrl: "views/modal_window.html",
//            data: { pageTitle: 'Modal window' }
//        })
//        .state('miscellaneous.chat_view', {
//            url: "/chat_view",
//            templateUrl: "views/chat_view.html",
//            data: { pageTitle: 'Chat view' }
//        })
//        .state('miscellaneous.nestable_list', {
//            url: "/nestable_list",
//            templateUrl: "views/nestable_list.html",
//            data: { pageTitle: 'Nestable List' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'ui.tree',
//                            files: ['css/plugins/uiTree/angular-ui-tree.min.css','js/plugins/uiTree/angular-ui-tree.min.js']
//                        },
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.notify', {
//            url: "/notify",
//            templateUrl: "views/notify.html",
//            data: { pageTitle: 'Notifications for angularJS' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'cgNotify',
//                            files: ['css/plugins/angular-notify/angular-notify.min.css','js/plugins/angular-notify/angular-notify.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.timeline_2', {
//            url: "/timeline_2",
//            templateUrl: "views/timeline_2.html",
//            data: { pageTitle: 'Timeline version 2' }
//        })
//        .state('miscellaneous.forum_view', {
//            url: "/forum_view",
//            templateUrl: "views/forum_view.html",
//            data: { pageTitle: 'Forum - general view' }
//        })
//        .state('miscellaneous.forum_post_view', {
//            url: "/forum_post_view",
//            templateUrl: "views/forum_post_view.html",
//            data: { pageTitle: 'Forum - post view' }
//        })
//        .state('miscellaneous.diff', {
//            url: "/diff",
//            templateUrl: "views/diff.html",
//            data: { pageTitle: 'Text Diff' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/diff_match_patch/javascript/diff_match_patch.js']
//                        },
//                        {
//                            name: 'diff-match-patch',
//                            files: ['js/plugins/angular-diff-match-patch/angular-diff-match-patch.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.pdf_viewer', {
//            url: "/pdf_viewer",
//            templateUrl: "views/pdf_viewer.html",
//            data: { pageTitle: 'PDF viewer' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/pdfjs/pdf.js']
//                        },
//                        {
//                            name: 'pdf',
//                            files: ['js/plugins/pdfjs/angular-pdf.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.sweet_alert', {
//            url: "/sweet_alert",
//            templateUrl: "views/sweet_alert.html",
//            data: { pageTitle: 'Sweet alert' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
//                        },
//                        {
//                            name: 'oitozero.ngSweetAlert',
//                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.idle_timer', {
//            url: "/idle_timer",
//            templateUrl: "views/idle_timer.html",
//            data: { pageTitle: 'Idle timer' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'cgNotify',
//                            files: ['css/plugins/angular-notify/angular-notify.min.css','js/plugins/angular-notify/angular-notify.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.live_favicon', {
//            url: "/live_favicon",
//            templateUrl: "views/live_favicon.html",
//            data: { pageTitle: 'Live favicon' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/tinycon/tinycon.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.spinners', {
//            url: "/spinners",
//            templateUrl: "views/spinners.html",
//            data: { pageTitle: 'Spinners' }
//        })
//        .state('miscellaneous.validation', {
//            url: "/validation",
//            templateUrl: "views/validation.html",
//            data: { pageTitle: 'Validation' }
//        })
//        .state('miscellaneous.agile_board', {
//            url: "/agile_board",
//            templateUrl: "views/agile_board.html",
//            data: { pageTitle: 'Agile board' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'ui.sortable',
//                            files: ['js/plugins/ui-sortable/sortable.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.masonry', {
//            url: "/masonry",
//            templateUrl: "views/masonry.html",
//            data: { pageTitle: 'Masonry' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/masonry/masonry.pkgd.min.js']
//                        },
//                        {
//                            name: 'wu.masonry',
//                            files: ['js/plugins/masonry/angular-masonry.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.toastr', {
//            url: "/toastr",
//            templateUrl: "views/toastr.html",
//            data: { pageTitle: 'Toastr' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            insertBefore: '#loadBefore',
//                            name: 'toaster',
//                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.i18support', {
//            url: "/i18support",
//            templateUrl: "views/i18support.html",
//            data: { pageTitle: 'i18support' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            insertBefore: '#loadBefore',
//                            name: 'toaster',
//                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.truncate', {
//            url: "/truncate",
//            templateUrl: "views/truncate.html",
//            data: { pageTitle: 'Truncate' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/dotdotdot/jquery.dotdotdot.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.clipboard', {
//            url: "/clipboard",
//            templateUrl: "views/clipboard.html",
//            data: { pageTitle: 'Clipboard' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/ngclipboard/clipboard.min.js']
//                        },
//                        {
//                            name: 'ngclipboard',
//                            files: ['js/plugins/ngclipboard/ngclipboard.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.loading_buttons', {
//            url: "/loading_buttons",
//            templateUrl: "views/loading_buttons.html",
//            data: { pageTitle: 'Loading buttons' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            name: 'angular-ladda',
//                            files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css','js/plugins/ladda/angular-ladda.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.tour', {
//            url: "/tour",
//            templateUrl: "views/tour.html",
//            data: { pageTitle: 'Tour' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            insertBefore: '#loadBefore',
//                            files: ['js/plugins/bootstrap-tour/bootstrap-tour.min.js', 'css/plugins/bootstrap-tour/bootstrap-tour.min.css']
//                        },
//                        {
//                            name: 'bm.bsTour',
//                            files: ['js/plugins/angular-bootstrap-tour/angular-bootstrap-tour.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.tree_view', {
//            url: "/tree_view",
//            templateUrl: "views/tree_view.html",
//            data: { pageTitle: 'Tree view' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/jsTree/style.min.css','js/plugins/jsTree/jstree.min.js']
//                        },
//                        {
//                            name: 'ngJsTree',
//                            files: ['js/plugins/jsTree/ngJsTree.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('tables', {
//            abstract: true,
//            url: "/tables",
//            templateUrl: "views/common/content.html"
//        })
//        .state('tables.static_table', {
//            url: "/static_table",
//            templateUrl: "views/table_basic.html",
//            data: { pageTitle: 'Static table' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'angular-peity',
//                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
//                        },
//                        {
//                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('tables.data_tables', {
//            url: "/data_tables",
//            templateUrl: "views/table_data_tables.html",
//            data: { pageTitle: 'Data Tables' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
//                        },
//                        {
//                            serie: true,
//                            name: 'datatables',
//                            files: ['js/plugins/dataTables/angular-datatables.min.js']
//                        },
//                        {
//                            serie: true,
//                            name: 'datatables.buttons',
//                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('tables.foo_table', {
//            url: "/foo_table",
//            templateUrl: "views/foo_table.html",
//            data: { pageTitle: 'Foo Table' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
//                        },
//                        {
//                            name: 'ui.footable',
//                            files: ['js/plugins/footable/angular-footable.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('tables.nggrid', {
//            url: "/nggrid",
//            templateUrl: "views/nggrid.html",
//            data: { pageTitle: 'ng Grid' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'ngGrid',
//                            files: ['js/plugins/nggrid/ng-grid-2.0.3.min.js']
//                        },
//                        {
//                            insertBefore: '#loadBefore',
//                            files: ['js/plugins/nggrid/ng-grid.css']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('commerce', {
//            abstract: true,
//            url: "/commerce",
//            templateUrl: "views/common/content.html",
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
//                        },
//                        {
//                            name: 'ui.footable',
//                            files: ['js/plugins/footable/angular-footable.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('commerce.products_grid', {
//            url: "/products_grid",
//            templateUrl: "views/ecommerce_products_grid.html",
//            data: { pageTitle: 'E-commerce grid' }
//        })
//        .state('commerce.product_list', {
//            url: "/product_list",
//            templateUrl: "views/ecommerce_product_list.html",
//            data: { pageTitle: 'E-commerce product list' }
//        })
//        .state('commerce.orders', {
//            url: "/orders",
//            templateUrl: "views/ecommerce_orders.html",
//            data: { pageTitle: 'E-commerce orders' }
//        })
//        .state('commerce.product', {
//            url: "/product",
//            templateUrl: "views/ecommerce_product.html",
//            data: { pageTitle: 'Product edit' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js']
//                        },
//                        {
//                            name: 'summernote',
//                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js','js/plugins/summernote/angular-summernote.min.js']
//                        }
//                    ]);
//                }
//            }
//
//        })
//        .state('commerce.product_details', {
//            url: "/product_details",
//            templateUrl: "views/ecommerce_product_details.html",
//            data: { pageTitle: 'E-commerce Product detail' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/slick/slick.css','css/plugins/slick/slick-theme.css','js/plugins/slick/slick.min.js']
//                        },
//                        {
//                            name: 'slick',
//                            files: ['js/plugins/slick/angular-slick.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('commerce.payments', {
//            url: "/payments",
//            templateUrl: "views/ecommerce_payments.html",
//            data: { pageTitle: 'E-commerce payments' }
//        })
//        .state('commerce.cart', {
//            url: "/cart",
//            templateUrl: "views/ecommerce_cart.html",
//            data: { pageTitle: 'Shopping cart' }
//        })
//        .state('gallery', {
//            abstract: true,
//            url: "/gallery",
//            templateUrl: "views/common/content.html"
//        })
//        .state('gallery.basic_gallery', {
//            url: "/basic_gallery",
//            templateUrl: "views/basic_gallery.html",
//            data: { pageTitle: 'Lightbox Gallery' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/blueimp/jquery.blueimp-gallery.min.js','css/plugins/blueimp/css/blueimp-gallery.min.css']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('gallery.bootstrap_carousel', {
//            url: "/bootstrap_carousel",
//            templateUrl: "views/carousel.html",
//            data: { pageTitle: 'Bootstrap carousel' }
//        })
//        .state('gallery.slick_gallery', {
//            url: "/slick_gallery",
//            templateUrl: "views/slick.html",
//            data: { pageTitle: 'Slick carousel' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/slick/slick.css','css/plugins/slick/slick-theme.css','js/plugins/slick/slick.min.js']
//                        },
//                        {
//                            name: 'slick',
//                            files: ['js/plugins/slick/angular-slick.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('css_animations', {
//            url: "/css_animations",
//            templateUrl: "views/css_animation.html",
//            data: { pageTitle: 'CSS Animations' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            reconfig: true,
//                            serie: true,
//                            files: ['js/plugins/rickshaw/vendor/d3.v3.js','js/plugins/rickshaw/rickshaw.min.js']
//                        },
//                        {
//                            reconfig: true,
//                            name: 'angular-rickshaw',
//                            files: ['js/plugins/rickshaw/angular-rickshaw.js']
//                        }
//                    ]);
//                }
//            }
//
//        })
//        .state('landing', {
//            url: "/landing",
//            templateUrl: "views/landing.html",
//            data: { pageTitle: 'Landing page', specialClass: 'landing-page' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/wow/wow.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('outlook', {
//            url: "/outlook",
//            templateUrl: "views/outlook.html",
//            data: { pageTitle: 'Outlook view', specialClass: 'fixed-sidebar' }
//        })
//        .state('off_canvas', {
//            url: "/off_canvas",
//            templateUrl: "views/off_canvas.html",
//            data: { pageTitle: 'Off canvas menu', specialClass: 'canvas-menu' }
//        });




function telaPadraoLazyLoad() {
        return   [
             {
                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
            },
            {
                name: 'oitozero.ngSweetAlert',
                files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
            },
            {
                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
            },
            {
                serie: true,
                files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
            },
            {
                serie: true,
                name: 'datatables',
                files: ['js/plugins/dataTables/angular-datatables.min.js']
            },
            {
                serie: true,
                name: 'datatables.buttons',
                files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
            },
            {
                name: 'ui.switchery',
                files: ['css/plugins/switchery/switchery.css', 'js/plugins/switchery/switchery.js', 'js/plugins/switchery/ng-switchery.js']
            },
            {
                            files: ['js/plugins/jasny/jasny-bootstrap.min.js']
            },
            {
                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
            }
        ];
    };
    
    
    function telaComplexa() {
        return   [
                            {
                                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                            },
                            {
                                name: 'oitozero.ngSweetAlert',
                                files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                            },
                            {
                                files: ['js/plugins/moment/moment.min.js']
                            },
                            {
                                name: 'ui.knob',
                                files: ['js/plugins/jsKnob/jquery.knob.js', 'js/plugins/jsKnob/angular-knob.js']
                            },
                            {
                                files: ['css/plugins/ionRangeSlider/ion.rangeSlider.css', 'css/plugins/ionRangeSlider/ion.rangeSlider.skinFlat.css', 'js/plugins/ionRangeSlider/ion.rangeSlider.min.js']
                            },
                            {
                                insertBefore: '#loadBefore',
                                name: 'localytics.directives',
                                files: ['css/plugins/chosen/bootstrap-chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                            },
                            {
                                name: 'nouislider',
                                files: ['css/plugins/nouslider/jquery.nouislider.css', 'js/plugins/nouslider/jquery.nouislider.min.js', 'js/plugins/nouslider/angular-nouislider.js']
                            },
                            {
                                name: 'datePicker',
                                files: ['css/plugins/datapicker/angular-datapicker.css', 'js/plugins/datapicker/angular-datepicker.js']
                            },
                            {
                                files: ['js/plugins/jasny/jasny-bootstrap.min.js']
                            },
                            {
                                files: ['css/plugins/clockpicker/clockpicker.css', 'js/plugins/clockpicker/clockpicker.js']
                            },
                            {
                                name: 'ui.switchery',
                                files: ['css/plugins/switchery/switchery.css', 'js/plugins/switchery/switchery.js', 'js/plugins/switchery/ng-switchery.js']
                            },
                            {
                                name: 'colorpicker.module',
                                files: ['css/plugins/colorpicker/colorpicker.css', 'js/plugins/colorpicker/bootstrap-colorpicker-module.js']
                            },
                            {
                                name: 'ngImgCrop',
                                files: ['js/plugins/ngImgCrop/ng-img-crop.js', 'css/plugins/ngImgCrop/ng-img-crop.css']
                            },
                            {
                                serie: true,
                                files: ['js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                            },
                            {
                                name: 'daterangepicker',
                                files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                            },
                            {
                                files: ['css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css']
                            },
                            {
                                name: 'ui.select',
                                files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                            },
                            {
                                files: ['css/plugins/touchspin/jquery.bootstrap-touchspin.min.css', 'js/plugins/touchspin/jquery.bootstrap-touchspin.min.js']
                            },
                            {
                                name: 'ngTagsInput',
                                files: ['js/plugins/ngTags//ng-tags-input.min.js', 'css/plugins/ngTags/ng-tags-input-custom.min.css']
                            },
                            {
                                files: ['js/plugins/dualListbox/jquery.bootstrap-duallistbox.js', 'css/plugins/dualListbox/bootstrap-duallistbox.min.css']
                            },
                            {
                                name: 'frapontillo.bootstrap-duallistbox',
                                files: ['js/plugins/dualListbox/angular-bootstrap-duallistbox.js']
                            },
                            {
                                serie: true,
                                files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                            },
                            {
                                serie: true,
                                name: 'datatables',
                                files: ['js/plugins/dataTables/angular-datatables.min.js']
                            },
                            {
                                serie: true,
                                name: 'datatables.buttons',
                                files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                            },
                            {
                                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                            },
                            {
                                name: 'oitozero.ngSweetAlert',
                                files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                            },
                            {
                                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                            },
                            {
                                files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
                            },
                            {
                                name: 'ui.footable',
                                files: ['js/plugins/footable/angular-footable.js']
                            },
                            {
                                files: ['css/plugins/steps/jquery.steps.css']    
                            }
                            
                        ];
    };


}
angular
    .module('lisnet')
    .config(config)
    .run(function($rootScope, $state) {
        console.log('rodando o run dentro do config ..');
        $rootScope.$state = $state;
//        $rootScope.$stateProvider = $stateProvider;
    });


// angular.module("lisnet")
//         .constant ('angularMomentConfig',
//    {preprocess: 'utc',timezone: 'Europe/France'}
//);