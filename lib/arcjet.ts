import arcjet, {
  shield,
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  slidingWindow,
} from '@arcjet/next';

export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ['userId'],
  rules: [
    shield({
      mode: 'LIVE',
    }),
  ],
});

export {
  shield,
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  slidingWindow,
};
