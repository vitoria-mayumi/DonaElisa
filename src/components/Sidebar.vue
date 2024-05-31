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
            <router-link class="button" to="/about">
                <span class="material-icons">group</span>
                <span class="text">Clientes</span>
            </router-link>
            <router-link class="button" to="/pratos">
                <span class="material-icons">restaurant</span>
                <span class="text">Pratos</span>
            </router-link>
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

const ToggleMenu = () => {
    is_expanded.value = !is_expanded.value

    localStorage.setItem("is-expanded", is_expanded.value)
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

    .flex {
        flex: 1 1 0;
    }

    .logo-small {
        margin-bottom: 1rem;

        img {
            width: 2rem;
        }
    }

    .logo-big {
        margin: 1rem auto;
        display: none;

        img{
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

            &.router-link-exact-active {
                border-right: 5px solid #940000cc;
            }
        }
    }

    &.is-expanded {
        width: 18rem;

        .logo-small{
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
    }

    @media (max-width: 768px) {
        position: fixed;
        z-index: 99;
    }
}
</style>