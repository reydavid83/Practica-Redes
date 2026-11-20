Vue.component("Login01", {
    props: ['ColorHeader', 'ColorBody', 'ColorButton'],
    template: /*html*/ `
		<form method="post" role="form" class="form-login" action="Home.asp">
			<div class="card rounded-0">
				<div class="card-header p-1" :style="{'background': ColorHeader}">
					<slot name="header">
						<img src="../../UASLIB/img/aguila.png" class="mx-auto d-block" width="50" height="60" alt="">
					</slot>
				</div>
				<div class="card-body pb-0" :style="{'background': ColorBody}">
					<div class="mdb form-group">
						<input type="number" class="form-control" name="Usuario" id="Usuario" placeholder="Usuario" required autofocus>
						<label for="Usuario">Usuario:</label>
					</div>
					<div class="mdb form-group mb-4">
						<input type="password" class="form-control" name="Password" id="Password" placeholder="Contraseña" required>
						<label for="Password">Contraseña:</label>
					</div>
					<button type="submit" class="btn btn-block text-white" name="btnEntrar" id="btnEntrar" :style="{'background': ColorButton}">
						Iniciar sesi&oacute;n
					</button>
					<span class="text-danger text-center pb-2">
						<slot name="msg">&nbsp;</slot>
					</span>
				</div>
			</div>
		</form>
	`
});

Vue.component("Login02", {
    props: ['ColorHeader', 'ColorBody', 'ColorButton'],
    template: /*html*/ `
		<form method="post" role="form" class="form-login" action="home.asp">
			<div class="card rounded-0">
				<div class="card-header p-1" :style="{'background': ColorHeader}">
					<slot name="header">
						<img src="../../UASLIB/img/aguila.png" class="mx-auto d-block" width="50" height="60" alt="">
					</slot>
				</div>
				<div class="card-body pb-0" :style="{'background': ColorBody}">
					<div class="mdb form-group">
						<input type="number" class="form-control" name="Ficha" id="Ficha" placeholder="Ficha" required autofocus>
						<label for="Ficha">Ficha:</label>
					</div>
					<div class="mdb form-group mb-4">
						<input type="password" class="form-control" name="Clave" id="Clave" placeholder="Clave" required>
						<label for="Clave">Clave:</label>
					</div>
					<button type="submit" class="btn btn-block text-white" name="btnEntrar" id="btnEntrar" :style="{'background': ColorButton}">
						Iniciar sesi&oacute;n
					</button>
					<span class="text-danger text-center pb-2">
						<slot name="msg">&nbsp;</slot>
					</span>
				</div>
			</div>
		</form>
	`
});

Vue.component("LoginAlumnos", {
    props: ['ColorHeader', 'ColorBody', 'ColorButton'],
    template: /*html*/ `
		<form method="post" role="form" class="form-login" action="home.php">
			<div class="card rounded-0">
				<div class="card-header p-1" :style="{'background': ColorHeader}">
					<slot name="header">
						<img src="../../UASLIB/img/aguila.png" class="mx-auto d-block" width="50" height="60" alt="">
					</slot>
				</div>
				<div class="card-body pb-0" :style="{'background': ColorBody}">
					<div class="mdb form-group">
						<input type="number" class="form-control" name="txtCuenta" id="txtCuenta" placeholder="Número de cuenta" required autofocus>
						<label for="Ficha">No. Cuenta:</label>
					</div>
					<div class="mdb form-group mb-4">
						<input type="password" class="form-control" name="txtNip" id="txtNip" placeholder="NIP" required>
						<label for="Clave">NIP:</label>
					</div>
					<button type="submit" class="btn btn-block text-white" name="Entrada" id="Entrada" :style="{'background': ColorButton}">
						Iniciar sesi&oacute;n
					</button>
					<span class="text-danger text-center pb-2">
						<slot name="msg">&nbsp;</slot>
					</span>
				</div>
			</div>
		</form>
	`
});

Vue.component("LoginEmpleados", {
    props: ['ColorHeader', 'ColorBody', 'ColorButton', 'ColorInput', 'ColorTextRecordar'],
    template: /*html*/ `
		<form method="post" role="form" class=" form-login" action="Home.asp">
			<div class="card rounded-0" :style="{'background-color': ColorHeader}">

				<div class="card-header p-1" :style="{'background-color': ColorHeader}">
					<slot name="header">
						<img src="../../UASLIB/img/aguila.png" class="mx-auto d-block" width="50" height="60" alt="">
					</slot>
				</div>

				<div class="card-body pb-0" :style="{'background-color': ColorBody}">
					<div class="mdb mdbwhite form-group">
						<input type="number" class="form-control mdbwhite" name="Usuario" id="Usuario" placeholder="Usuario" required autofocus :style="{'background-color': ColorInput}">
						<label for="Usuario">Usuario:</label>
					</div>
					<div class="mdb mdbwhite form-group mb-4">
						<input type="password" class="form-control mdbwhite" name="Password" id="Password" placeholder="Contraseña" required :style="{'background-color': ColorInput}">
						<label for="Password">Contraseña:</label>
					</div>
					<button type="submit" class="btn btn-block text-white" name="btnEntrar" id="btnEntrar" :style="{'background-color': ColorButton}">
						Iniciar sesi&oacute;n
					</button>
					<span class="text-danger text-center pb-2">
						<slot name="msg">&nbsp;</slot>
					</span>
                    <div class="row pt-2 pb-3">
                        <div class="col">
                            <a href="recordar/default.php" :style="{'color': ColorTextRecordar}">¿Olvidaste tu contraseña?</a>
                        </div>
                    </div>
				</div>

            </div>
		</form>
	`
});

Vue.component("Head01", {
    props: ['ColorLine', 'BgBody', 'ColorBody'],
    template: /*html*/ `
		<div>
			<div class="p-0" :style="{'height': '0.1rem', 'background': ColorLine}"></div>
			<div class="container-fluid" :style="{'background': BgBody, 'color': ColorBody}">
				<div class="d-flex flex-row">
					<div class="py-2 flex-grow-0">
						<a href="../index.php">
							<img src="../../UASLIB/img/aguila.png" width="50" height="60" alt="">
						</a>
					</div>
					<div class="flex-grow-1 d-flex align-items-center">
						<div class="container-fluid">
							<div class="row">
								<slot name="body">&nbsp;</slot>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="p-0" :style="{'height': '0.2rem', 'background': ColorLine}"></div>
		</div>
	`
});

Vue.component("Head02", {
    props: ['BgTitle', 'BgBody', 'ColorTitle', 'ColorBody'],
    methods: {
        mostrar() {
            this.$emit("menu-open");
        }
    },
    template: /*html*/ `
		<div>
			<nav class="navbar navbar-light flex-nowrap flex-row py-1" :style="{'background': BgTitle, 'color': ColorTitle}">
				<div class="container-fluid p-0">
					<slot name="title"></slot>
				</div>
			</nav>
			<nav class="navbar navbar-expand navbar-light p-0" :style="{'background': BgBody, 'color': ColorBody}">
				<a class="p-1 px-3 pt-2" href="../index.php">
					<img src="../../UASLIB/img/aguila.png" width="50" height="60" alt="">
				</a>
				<div class="container-fluid d-none d-sm-block">
					<div class="d-flex flex-column flex-wrap">
						<slot name="body">&nbsp;</slot>
					</div>
				</div>
				<a href="#" class="btn float-right d-block d-sm-none" role="button" aria-pressed="true" v-on:click="mostrar">
					<i class="fas fa-bars fa-2x"></i>
				</a>
			</nav>
		</div>
	`,
});

Vue.component("HeadSace", {
    props: ['BgTitle', 'BgBody', 'ColorTitle', 'ColorBody'],
    methods: {
        mostrar() {
            this.$emit("menu-open");
        }
    },
    template: /*html*/ `
		<div>
			<nav class="navbar navbar-light flex-nowrap flex-row py-1" :style="{'background': BgTitle, 'color': ColorTitle}">
				<div class="container-fluid p-0">
					<slot name="title"></slot>
				</div>
			</nav>
			<nav class="navbar navbar-expand navbar-light p-0" :style="{'background': BgBody, 'color': ColorBody}">
				<a class="p-1 px-3 pt-1" href="">
					<img src="../../UASLIB/img/aguila.png" width="35" height="40" alt="">
				</a>
				<div class="container-fluid d-none d-md-block">
					<div class="d-flex flex-column flex-wrap">
						<slot name="body">&nbsp;</slot>
					</div>
				</div>
				<a href="#" class="btn float-right d-block d-md-none" role="button" aria-pressed="true" v-on:click="mostrar">
					<i class="fas fa-bars fa-2x"></i>
				</a>
			</nav>
		</div>
	`,
});

Vue.component("Footer01", {
    props: ['BgBody', 'ColorBody'],
    template: /*html*/ `
		<div :style="{'background': BgBody}">
			<div class="container" :style="{'background': BgBody, 'color': ColorBody}">
				<p class="p-1 m-0">
					<i class="far fa-registered"></i>&nbsp;Direcci&oacute;n de Inform&aacute;tica, Universidad Aut&oacute;noma de Sinaloa, Todos los derechos reservados.
				</p>
			</div>
		</div>
	`
});

Vue.component("Sidebar01", {
    props: ['mostrar', 'BgHeader', 'ColorHeader', 'BgBody', 'ColorBody'],
    methods: {
        cerrar() {
            this.$emit("sidebar-close");
        }
    },
    template: /*html*/ `
		<div>
			<div class="sidebar-01-overlay" :class="{ active: mostrar }" v-on:click="cerrar"></div>

			<nav class="sidebar-01 mCustomScrollbar" data-mcs-theme="light" :class="{ active: mostrar }">
				<div class="sidebar-header">
					<div class="sidebar-01-close" v-on:click="cerrar">
						<i class="fas fa-arrow-left"></i>
					</div>
					<div class="d-flex flex-row pt-3">
						<div class="p-1">
							<div class="user-pic p-0">
								<img class="img-responsive img-rounded" src="../UASLIB/img/user.jpg" alt="">
							</div>
						</div>
						<div class="px-2 pt-2 pb-1 sidebar-01-header-text">
							<slot name="header-text"></slot>
						</div>
					</div>
					<div class="d-flex flex-row-reverse px-2 p-0 pb-1">
						<slot name="header-button"></slot>
					</div>
				</div>
				<div>
					<slot name="body"></slot>
				</div>
			</nav>
		</div>
	`
});

Vue.component("MenuVertical01", {
    props: ['menu'],
    render(createElement) {
        let menuFormato = this.formatearOpciones(this.menu);

        return createElement(
            'ul', {
                attrs: {
                    'class': 'nav flex-column flex-nowrap overflow-hidden',
                    'id': 'sidebar'
                }
            },
            this.construirMenu(menuFormato, createElement, 'sidebar')
        )
    },
    methods: {
        construirMenu(data, createElement, parent) {
            let renderMenu = []

            for (let i = 0; i < data.length; i++) {
                let item = data[i]

                let option = createElement(
                    'li', {
                        attrs: {
                            'class': 'nav-item'
                        }
                    }, [
                        createElement(
                            'a', {
                                attrs: {
                                    'class': 'nav-link' + (item.submenu ? ' collapsed text-truncate' : ''),
                                    'href': (item.submenu ? '#' : item.url),
                                    'data-toggle': (item.submenu ? 'collapse' : ''),
                                    'data-target': (item.submenu ? '#' + item.name : '')
                                }
                            }, [
                                createElement(
                                    'i', {
                                        attrs: {
                                            'class': item.icon
                                        }
                                    }
                                ),
                                createElement(
                                    'span', {
                                        attrs: {
                                            'class': (item.icon == '' ? '' : 'pl-1')
                                        }
                                    }, [
                                        item.name.split("-").join(" "),
                                    ]
                                )
                            ]
                        ),
                        item.submenu ? [
                            createElement(
                                'div', {
                                    attrs: {
                                        'class': 'collapse',
                                        'id': item.name,
                                        'data-parent': '#' + parent
                                    }
                                }, [
                                    createElement(
                                        'ul', {
                                            attrs: {
                                                'class': 'flex-column nav'
                                            }
                                        },
                                        this.construirMenu(item.submenu, createElement, item.name)
                                    )
                                ]
                            )
                        ] :
                        ''
                    ]
                )
                renderMenu.push(option)
            }
            return renderMenu;
        },

        formatearOpciones(data) {
            let source = [];
            let submenu = [];

            for (let i = 0; i < data.length; i++) {
                let item = data[i];

                let id = item["id"];
                let parentid = item["parentid"];
                let name = item["name"];
                let icon = item["icon"];
                let url = item["url"];

                if (submenu[parentid]) {
                    let subitem = { id: id, parentid: parentid, name: name, icon: icon, url: url };

                    if (!submenu[parentid].submenu) {
                        submenu[parentid].submenu = [];
                    }
                    submenu[parentid].submenu[submenu[parentid].submenu.length] = subitem;
                    submenu[id] = subitem;
                } else {
                    submenu[id] = { id: id, parentid: parentid, name: name, icon: icon, url: url };
                    source[id] = submenu[id];
                }
            }
            source = source.filter(item => item.parentid != null);
            return source;
        },
    }
});

Vue.component("MenuHorizontal01", {
    props: ['menu'],
    render(createElement) {
        let menuFormato = this.formatearOpciones(this.menu);

        return createElement(
            'ul', {
                attrs: {
                    'class': 'nav navbar-nav',
                    'id': 'main-menu'
                }
            },
            this.construirMenu(menuFormato, createElement)
        )
    },
    methods: {
        construirMenu(data, createElement) {
            let renderMenu = []

            for (let i = 0; i < data.length; i++) {
                let item = data[i]

                let option = createElement(
                    'li', {
                        attrs: {
                            'class': (item.submenu ? (item.parentid == 0 ? 'nav-item dropdown' : 'dropdown') : ''),
                        }
                    }, [
                        createElement(
                            'a', {
                                attrs: {
                                    'class': (item.submenu ? (item.parentid == 0 ? 'nav-link' : 'dropdown-item') : 'dropdown-item'),
                                    'href': (item.submenu ? '#' : item.url)
                                }
                            }, [
                                createElement(
                                    'i', {
                                        attrs: {
                                            'class': item.icon
                                        }
                                    }
                                ),
                                createElement(
                                    'span', {
                                        attrs: {
                                            'class': (item.icon == '' ? '' : 'pl-1')
                                        }
                                    }, [
                                        item.name.split("-").join(" "),
                                    ]
                                )
                            ]
                        ),
                        item.submenu ? [
                            createElement(
                                'ul', {
                                    attrs: {
                                        'class': 'dropdown-menu'
                                    }
                                },
                                this.construirMenu(item.submenu, createElement)
                            )
                        ] :
                        ''
                    ]
                )
                renderMenu.push(option)
            }
            return renderMenu;
        },

        formatearOpciones(data) {
            let source = [];
            let submenu = [];

            for (let i = 0; i < data.length; i++) {
                let item = data[i];

                let id = item["id"];
                let parentid = item["parentid"];
                let name = item["name"];
                let icon = item["icon"];
                let url = item["url"];

                if (submenu[parentid]) {
                    let subitem = { id: id, parentid: parentid, name: name, icon: icon, url: url };

                    if (!submenu[parentid].submenu) {
                        submenu[parentid].submenu = [];
                    }
                    submenu[parentid].submenu[submenu[parentid].submenu.length] = subitem;
                    submenu[id] = subitem;
                } else {
                    submenu[id] = { id: id, parentid: parentid, name: name, icon: icon, url: url };
                    source[id] = submenu[id];
                }
            }
            source = source.filter(item => item.parentid != null);
            return source;
        },
    }
});

