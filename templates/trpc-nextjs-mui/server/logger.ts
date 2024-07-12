import chalk from 'chalk';

export const info = (text: string) => {
  console.log(chalk.cyanBright(`[next-custom-server] ${text}`));
};

export const error = (message: string) => {
  console.log(chalk.red(`[next-custom-server] ${message}`));
};
