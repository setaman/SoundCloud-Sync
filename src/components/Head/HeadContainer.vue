<template>
  <div id="head-container" class="row wrap">
    <div class="cover">
      <cover
             :bg-image-one="bgOne"
             :bg-image-two="bgTwo"/>
    </div>
    <user-one/>
    <user-two/>
  </div>
</template>

<script>
import UserOne from './UserOne'
import UserTwo from './UserTwo'
import Cover from './Cover'
import getBackgroundImage from '../../utils/generateBackgroundImage'

export default {
  name: 'HeadContainer',
  components: { Cover, UserTwo, UserOne },
  data: () => ({
    bgOne: '',
    bgTwo: ''
  }),
  methods: {
    async backgroundImageOne () {
      // eslint-disable-next-line no-return-await
      this.bgOne = await getBackgroundImage(this.userOne.avatar_url)
    },
    async backgroundImageTwo () {
      // eslint-disable-next-line no-return-await
      this.bgTwo = await getBackgroundImage(this.userTwo.avatar_url)
    }
  },
  computed: {
    userOne () {
      return this.$store.state.users.userOne
    },
    userTwo () {
      return this.$store.state.users.userTwo
    }
  },
  mounted () {
    this.backgroundImageTwo()
    this.backgroundImageOne()
  }
}
</script>

<style scoped lang="scss">
  #head-container{
    height: 200px;
    width: 100%;
    position: relative;
    .cover {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
    }
  }

</style>
