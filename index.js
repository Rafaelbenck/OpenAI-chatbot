import readlineSync from 'readline-sync';
import colors from 'colors';
import openai from './config/open-ai.js';

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

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    const completionText = completion.data.choices[0].message.content;
    console.log(colors.green('Bot: ') + completionText);

  } catch (error) {
    console.error('Error:', error);
  }
})();

