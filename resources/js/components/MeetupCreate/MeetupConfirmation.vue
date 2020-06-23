<template>
    <div>
        <h1 class="title m-b-sm">Please confirm entered data</h1>

        <div class="content">
            <div>
                <span class="result-title">
                    Location
                </span>
                <p>{{ meetupPayload.location }}</p>
            </div>
            <div>
                <span class="result-title">
                    Title
                </span>
                <p>{{ meetupPayload.title }}</p>
            </div>
            <div>
                <span class="result-title">
                    Start Date
                </span>
                <p>{{ meetupPayload.startDate }}</p>
            </div>
            <div>
                <span class="result-title">
                    From
                </span>
                <p>{{ meetupPayload.timeFrom }}</p>
            </div>
            <div>
                <span class="result-title">
                    To
                </span>
                <p>{{ meetupPayload.timeTo }}</p>
            </div>
            <div>
                <span class="result-title">
                    Category
                </span>
                <p>{{ meetupPayload.category.name }}</p>
            </div>
            <div>
                <span class="result-title">
                    Image
                </span>
                <p>{{ meetupPayload.image }}</p>
            </div>
            <div>
                <span class="result-title">
                    Short Info
                </span>
                <p>{{ meetupPayload.shortInfo }}</p>
            </div>
            <div>
                <span class="result-title">
                    Description
                </span>
                <p>{{ meetupPayload.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        meetupPayload: {
            required: true,
            type: Object
        }
    },
    validations: {}
};
</script>

<style scoped>
.result-title {
    font-size: 29px;
    font-weight: bold;
}
.result-title + p {
    font-size: 20px;
}
</style>
