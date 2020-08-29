<template lang="pug">
    include ../../tools/mixins.pug
    div
        main-component(
            :content="content"
            :loading="loading"
            @fetchData="fetchData"
            @openPopup="openInfoPopup"
        )
        popup-info-component(
            :active="popups.info.active"
            :text="popups.info.data"
            @close="closePopup('info')"
        )
</template>

<script>
import Main from "../components/sections/Main.vue";
import PopupInfo from "../components/sections/PopupInfo.vue";

import data from "../mixins/data";
import popupParent from "../mixins/popup/popupParent";
export default {
    mixins: [
        data,
        popupParent
    ],
    components: {
        'main-component': Main,
        'popup-info-component': PopupInfo
    }
}
</script>