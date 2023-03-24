export const IS_PROD = process.env.NODE_ENV === 'production';

// @ts-ignore: this will work in actual bitbucket but not locally
export const userUuid = IS_PROD ? JSON.parse(jQuery('#bb-bootstrap').attr('data-current-user')).uuid : 'd6dbcb87-d4b9-4f06-b845-fc382807cc2c';
