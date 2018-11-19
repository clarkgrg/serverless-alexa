'use strict';

const Alexa = require('ask-sdk-core');

const SKILL_NAME = 'One Direction';

const _facts = [
  "The five members of One Direction are Harry Styles, Niall Horan, Louis Tomlinson, Liam Payne and Zayn Malik.",
  "To hire One Direction out for one night, it would cost over £30,000!",
  "Each member of One Direction applied as solo contestants on the UK X Factor, but failed to qualify for the Boys category. They were then put together as a group.",
  "One Direction starred in a series of TV ads and events for Pokémon Black and White.",
  "Liam Payne Appeared on The UK's X Factor in 2008. He made it through to the judges houses.",
  "Harry's full name is Harry Edward Styles. His Twitter is @Harry_Styles.",
  "One Direction finished third on the seventh series of UK's X Factor.",
  "Liam's middle name is James.",
  "Liam's star sign is Virgo.",
  "Louis' middle name is William.",
  "Louis was born on Christmas Eve in 1991.",
  "Zayn was born on 12th January 1993.",
  "Amazon revealed that One Direction's 2012 calendar is the top-selling calendar of all time.",
  "One Direction have had three books released.",
  "Their first book called One Direction: Forever Young (Our Official X Factor Story) reached the number one spot on the Sunday Times Best-seller list.",
  "One Direction announced their debut UK tour, which sold out within 12 minutes of release!",
  "Zayn didn't have a passport before he was in One Direction.",
  "As a band, One Direction's biggest inspiration is 'Take That'.",
  "Harry used to be in a band called 'White Eskimo'.",
  "'White Eskimo' performed at a wedding in June 2010.",
  "Harry is the youngest member of One Direction.",
  "They saw each other naked pretty much the first time they worked together, Harry stripped down first!",
  "Louis is the oldest member of 1D.",
  "'What Makes You Beautiful' was the third fastest selling single of 2011.",
  "Harry's favourite film genre is action/adventure.",
  "Harry was the one who came up with the band's name 'One Direction'.",
  "Liam's favourite sport is boxing.",
  "The only book Niall has ever read is To Kill A Mockingbird.",
  "Louis has four sisters.",
  "Louis got suspended from school and had to retake year 12.",
  "Harry can speak French.",
  "Louis had a chilli flavoured ice cream in France and said it was amazing!",
  "Juggling is one of Harry's hidden talents.",
  "Their first single, 'What Makes You Beautiful' was released on 11th September 2011 and was number one of the UK singles charts a week later.",
  "One Direction's second single, 'Gotta Be You', was released on 13 November 2011, which made number 3 in the charts.",
  "Their debut album 'Up All Night' was the fastest selling debut album on the UK Albums Chart in 2011.",
  "'Up All Night' was the 16th biggest selling album of 2011.",
  "After The X Factor, the band signed a £2 million record contract with Syco Music.",
  "Louis' favourite film is Grease.",
  "Liam and Zayn played Pokémon loads when they were younger, but Harry didn't play much until he was introduced to it, now 1D are all Pokéfans!",
  "Louis does not like tattoos, but has some anyway!",
  "Harry's star sign is Aquarius.",
  "'The Fray' is Louis' favourite band.",
  "Harry had his first kiss when he was 11.",
  "Niall is the only member of 1D who was not born in the UK. He was born in Ireland.",
  "Niall plays the guitar.",
  "Niall's favourite colour is blue.",
  "When Harry was younger his hair used to be straight!",
  "Harry does not like mayonnaise.",
  "One Direction launched limited edition Nokia C2-02 and Nokia C3-00 phones."
  ];

// Handlers
const LaunchRequestHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
      const speechText = `Welcome to ${SKILL_NAME}. You can get fun One Direction facts by saying tell me something about One Direction`;
      return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt(speechText)
          .withSimpleCard(SKILL_NAME, speechText)
          .getResponse();
  }
};

const FactIntentHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'FactIntent';
  },
  handle(handlerInput) {
      // Find a random fact
      const factIndex = Math.floor(Math.random() * _facts.length);
      const speechText = _facts[factIndex];
      return handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard(SKILL_NAME, speechText)
          .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;            
      console.log(`Request Type: ${request.type}`);
      console.log(`Intent: ${request.intent.name}`);    
      return request.type === 'IntentRequest'
          && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
      const speechText = 'You can get fun One Direction facts by saying tell me something about One Direction';
      return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt(speechText)
          .withSimpleCard(SKILL_NAME, speechText)
          .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;    
      console.log(`Request Type: ${request.type}`);
      console.log(`Intent: ${request.intent.name}`);
      return request.type === 'IntentRequest'
          && (request.intent.name === 'AMAZON.CancelIntent'
          || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
      const speechText = 'Goodbye!';
      return handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard(SKILL_NAME, speechText)
          .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;    
      console.log(`Request Type: ${request.type}`);
      console.log(`Intent: ${request.intent.name}`);
      return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
      //any cleanup logic goes here
      return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

exports.onedirection = Alexa.SkillBuilders.custom()
    .addRequestHandlers(LaunchRequestHandler,
                        FactIntentHandler,
                        HelpIntentHandler,
                        CancelAndStopIntentHandler,
                        SessionEndedRequestHandler)
    .addErrorHandlers(ErrorHandler)
    .lambda();

