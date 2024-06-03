<template>
    <aside :class="`${is_expanded && 'is-expanded'}`">
        <div class="logo-small">
            <img src="../assets/logo-small.png" alt="Logo Dona Elisa">
        </div>

        <div class="logo-big">
            <img src="../assets/logo-big.png" alt="Logo Dona Elisa">
        </div>

        <div class="menu-toggle-wrap">
            <button class="menu-toggle" @click="ToggleMenu">
                <span class="material-icons">chevron_right</span>
            </button>
        </div>

        <div class="menu">
            <router-link class="button" to="/">
                <span class="material-icons">article</span>
                <span class="text">Encomendas</span>
            </router-link>
            <router-link class="button" to="/clientes">
                <span class="material-icons">group</span>
                <span class="text">Clientes</span>
            </router-link>
            
            <div class="menu-item">
                <router-link class="button" to="/pratos">
                    <span class="material-icons">restaurant</span>
                    <span class="text">Pratos</span>
                </router-link>
                <button class="submenu-toggle" @click="ToggleSubmenu" :class="`${ is_submenu_open && 'rotated' }`">
                    <span class="material-icons">expand_more</span>
                </button>
            </div>
            
            <div v-if="is_submenu_open" class="submenu">
                <router-link class="button" to="/categorias_pratos">
                    <span class="text">Categorias</span>
                </router-link>
            </div>
            <router-link class="button" to="/relatorios">
                <span class="material-icons">description</span>
                <span class="text">Relatórios</span>
            </router-link>
        </div>

        <div class="flex"></div>

        <div class="menu">
            <router-link class="button" to="/usuarios">
                <span class="material-icons">settings</span>
                <span class="text">Gerenciar Usuários</span>
            </router-link>
        </div>
    </aside>
</template>



<script setup>
import { ref } from 'vue'

const is_expanded = ref(localStorage.getItem("is-expanded") === "true")
const is_submenu_open = ref(localStorage.getItem("rotated") === "true")

const ToggleMenu = () => {
    is_expanded.value = !is_expanded.value
    localStorage.setItem("is-expanded", is_expanded.value)
}

const ToggleSubmenu = () => {
    is_submenu_open.value = !is_submenu_open.value
    localStorage.setItem("rotated", is_submenu_open.value)
}
</script>

<style lang="scss" scoped>
aside {
    display: flex;
    flex-direction: column;
    width: calc(2rem + 32px);
    min-height: 100vh;
    overflow: hidden;
    padding: 1rem;
    background-color: white;
    color: #383838;
    transition: 0.2s ease-out;
    //position: fixed;

    .flex {
        flex: 1 1 0;
    }

    .logo-small {
        margin-bottom: 1.5rem;
        margin-top: 1.5rem;

        img {
            width: 2rem;
        }
    }

    .logo-big {
        margin: 1rem auto;
        display: none;

        img {
            width: 140px;
        }
    }

    .menu-toggle-wrap {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;
        position: relative;
        top: 0;
        transition: 0.2s ease-out;

        .menu-toggle {
            border: none;
            background-color: white;
            cursor: pointer;
            transition: 0.2s ease-out;

            .material-icons {
                font-size: 1.6rem;
                color: #383838;
                transition: 0.2s ease-out;
            }

            &:hover {
                .material-icons {
                    color: rgb(221, 221, 221);
                    transform: translateX(0.5rem);
                }
            }
        }
    }

    .button .text {
        opacity: 0;
        transition: 0.3s ease-out;
    }

    .menu {
        margin: 0 -1rem;

        .button {
            display: flex;
            align-items: center;
            text-decoration: none;
            padding: 0.5rem 1rem;
            transition: 0.2s ease-out;

            .material-icons {
                font-size: 1.8rem;
                color: #383838;
                transition: 0.2s ease-out;
            }

            .text {
                color: #383838;
                font-size: 1rem;
                transition: 0.2s ease-out;
            }

            &:hover, &.router-link-exact-active {
                background-color: white;

                .material-icons, .text {
                    color: #940000;
                }
            }
        }

        .menu-item {
            display: flex;
            align-items: center;
            padding: 0.5rem 1rem;
            transition: 0.2s ease-out;
            justify-content: space-between;

            .button {
                padding: 0;

                &:hover, &.router-link-exact-active {
                    background-color: transparent;

                    .material-icons, .text {
                        color: #940000;
                    }
                }
            }

            .submenu-toggle {
                border: none;
                background-color: transparent;
                cursor: pointer;
                display: flex;
                align-items: center;
                padding: 0 0.5rem;
                transition: 0.2s ease-out;
                margin-right: -1.5rem;

                .material-icons {
                    font-size: 1.6rem;
                    color: #383838;
                    transition: 0.3s ease-out;
                }

                &.rotated .material-icons {
                    transform: rotate(-180deg);
                }
            }

            &:hover {
                .button {
                    .text {
                        color: #940000;
                    }

                    .material-icons {
                        color: #940000;
                    }
                }

                .submenu-toggle {
                    .material-icons {
                        color: #940000;
                    }
                }
            }
        }

        .submenu {
            display: none;
            flex-direction: column;

            .button {
                padding-left: 0;
                transition: 0.2s ease-out;

                .text {
                    padding-left: 2.6rem;
                }

                .material-icons {
                    font-size: 1.4rem;
                }

                &:hover, &.router-link-exact-active {
                    background-color: white;

                    .material-icons, .text {
                        color: #940000;
                    }
                }
            }
        }
    }

    &.is-expanded {
        width: 18rem;

        .logo-small {
            display: none;
        }

        .logo-big {
            display: block;
        }

        .menu-toggle-wrap {
            top: -8rem;

            .menu-toggle {
                transform: rotate(-180deg);
            }
        }

        .menu {
            margin-top: -2rem;
        }

        .button .text {
            opacity: 1;
        }

        .button {
            padding: 0.6rem 2.5rem;

            .material-icons {
                margin-right: 1rem;
            }

            &:hover {
                background-color: #9400001c;
            }
        }

        .menu-item {
            padding: 0.6rem 2.5rem;

            .button {
                &:hover {
                    background-color: transparent;
                } 
            }
            
            &:hover {
                background-color: #9400001c;
            }
        }

        .submenu {
            display: flex;
            margin-bottom: .5rem;

            .button {
                &:hover {
                    background-color: #9400001c;
                }
            }
        }
    }

    @media (max-width: 768px) {
        position: fixed;
        z-index: 99;
    }
}
</style>