export const IS_PROD = process.env.NODE_ENV === 'production';

export const loggedInUserUuid = IS_PROD
  ? // @ts-ignore: this will work in actual bitbucket but not locally
    JSON.parse(jQuery('#bb-bootstrap').attr('data-current-user')).uuid
  : 'me';
