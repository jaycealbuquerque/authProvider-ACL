import dayjs from 'dayjs'
import { AppError } from '../erros/AppError'
import { v4 as uuidV4 } from 'uuid'
import { resolve } from 'path'
import { env } from '../env'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { IUsersTokenRepository } from '../repositories/IUsersTokenRepository'
import { IMailProvider } from '../providers/mailProvider/IMailProvider'

export class SendForgotPasswordUseCase {
  constructor(
    private UsersRepository: IUsersRepository,
    private UsersTokenRepository: IUsersTokenRepository,
    private MailProvider: IMailProvider,
  ) {}

  public async execute(email: string) {
    // const prismaUsersRepository = new PrismaUsersRepository()
    // const prismaUserTokenRepository = new PrismaUserTokenRepository()
    // const etherealMailProvider = new EtherealMailProvider()

    const user = await this.UsersRepository.findByEmail(email)

    const templatePath = resolve(
      __dirname,
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    )

    if (!user) {
      throw new AppError('User does not exists!')
    }
    const token = uuidV4()

    const expires_date = dayjs().add(1, 'hour').toDate()

    await this.UsersTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    })

    const variables = {
      name: user.name,
      link: `${env.FORGOT_MAIL_URL}${token}`,
    }

    await this.MailProvider.sendMail(
      email,
      'recuperação de senha',
      variables,
      templatePath,
    )

    return { user }
  }
}
