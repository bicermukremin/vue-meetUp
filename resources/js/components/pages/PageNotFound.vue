<template>
    <div class="container">
        <div class="notFoundContainer">
            <div class="m-b-xxl">
                <h1 class="title">
                    Ooooops, page you are trying to access doesn't exist'
                </h1>
                <router-link to="/" class="button is-primary"
                    >Navigate back Home</router-link
                >
            </div>
            <h2 class="subtitle">404<span> :(</span></h2>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.title {
    font-size: 40px;
}
.subtitle {
    font-size: 160px;
    text-align: center;
}
.notFoundContainer {
    margin-top: 80px;
}
</style>
