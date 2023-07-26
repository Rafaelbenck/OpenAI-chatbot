import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function makeRequestWithDelay(params, delayTime) {
  try {
    await delay(delayTime);
    const response = await openai.createChatCompletion(params);
    return response;
  } catch (error) {
    throw error;
  }
}

async function main() {
  const messages = [];

  while (true) {
    const userInput = readlineSync.question(colors.bold.yellow('You: '));
    
    if (userInput.toLowerCase() === 'exit') {
      console.log('Exiting the chatbot...');
      break;
    }
    messages.push({ role: 'user', content: userInput });

    try {
      const completion = await makeRequestWithDelay(
        {
          model: 'gpt-3.5-turbo',
          messages: messages,
        },
        1000
      );

      const completionText = completion.data.choices[0].message.content;
      console.log(colors.green('Bot: ') + completionText);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
