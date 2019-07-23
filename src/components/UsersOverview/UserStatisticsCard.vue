<template>
  <div class="user-statistics-card text-center q-pa-md" :class="[type]">
    <h6 class="user-statistics-card-title q-my-none q-pb-sm text-uppercase text-white">
      {{ title }}
    </h6>
    <div class="user-statistics-card-content flex flex-center">
      <div>
        <span class="user-statistics-card-value">
          {{ valueOne }}
        </span>
        <user-statistics-divider/>
        <span class="user-statistics-card-value">
          {{ valueTwo}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import UserStatisticsDivider from './UserStatisticsDivider';

export default {
  name: 'UserStatisticsCard',
  components: { UserStatisticsDivider },
  props: {
    type: {
      type: String,
      required: false,
      default: 'likes'
    },
    title: {
      type: String,
      required: true
    },
    valueOne: {
      type: [String, Number],
      required: true
    },
    valueTwo: {
      type: [String, Number],
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
  $border_radius: 0px;
  /*$c_likes: #ff0060;
  $c_followings: #2069ff;
  $c_playlists: #1dd48c;
  $c_settings: #8344ff;*/

  $c_bg: #231c45;
  $c_likes: #ff4966;
  $c_followings: #2069ff;
  $c_playlists: #26ffae;
  $c_settings: #8344ff;

  .user-statistics-card {
    border-radius: $border_radius;
    position: relative;
    //clip-path: polygon(0 0, 100% 0%, 75% 100%, 0% 100%);
    /*&:before, &:after {
      display: block;
      content: '';
      width: 90%;
      height: 20px;
      position: absolute;
      border-radius: $border_radius;
      top: -10px;
      left: 5%;
    }
    &:before {
      width: 80%;
      height: 20px;
      top: -20px;
      left: 10%;
    }*/
    &.likes {
      background-color: rgba($c_likes, 0.1);
      //box-shadow: 0 0 50px 5px rgba($c_likes, 0.3);
      color: $c_likes;

      &:before, &:after {
        background-image: linear-gradient(to top, transparent, rgba($c_likes, 0.2));
      }
    }

    &.followings {
      background-color: rgba($c_followings, 0.1);
      //box-shadow: 0 0 50px 5px rgba($c_followings, 0.3);
      color: $c_followings;

      &:before, &:after {
        background-image: linear-gradient(to top, transparent 10%, rgba($c_followings, 0.2));
      }
    }

    &.playlists {
      background-color: rgba($c_playlists, 0.1);
      //box-shadow: 0 0 50px 5px rgba($c_playlists, 0.3);
      color: $c_playlists;

      &:before, &:after {
        background-image: linear-gradient(to top, transparent 10%, rgba($c_playlists, 0.2));
      }
    }
  }

  .user-statistics-card-content {
  }

  .user-statistics-card-value {
    //color: white;
    font-weight: bold;
    letter-spacing: 0.1rem;
    font-size: 1.7rem;
  }

  .user-statistics-card-title {
    //color: white;
    //font-weight: bold;
    letter-spacing: 0.2rem;
    font-size: 0.8rem;
  }

</style>
