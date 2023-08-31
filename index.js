import axios from 'axios';
import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

const makeRequestWithDelay = async (data) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openai}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

(async () => {
  try {
    const messages = [];

    while (true) {
      const userInput = readlineSync.question(colors.bold.yellow('You: '));
      
      if (userInput.toLowerCase() === 'exit') {
        console.log('Exiting the chatbot...');
        break;
      }
      messages.push({ role: 'user', content: userInput });  
    }

    const completion = await makeRequestWithDelay({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    const completionText = completion.data.choices[0].message.content;
    console.log(colors.green('Bot: ') + completionText);

  } catch (error) {
    console.error('Error:', error);
  }
})();

