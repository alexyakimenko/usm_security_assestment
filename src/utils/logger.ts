import { HttpErrorLog, UserActionLog } from '@/models'
import { UserActionType } from '@/models/user-action-log.model'
import { AppErrorLog } from '@/models/app-error-log.model'

interface UserData {
  user_id?: string
  ip_address?: string
  user_agent?: string
}

interface HttpError {
  status_code: number
  method: string
  url: string
}

interface AppError {
  error_type: string
  message: string
  url?: string
}

class Logger {
  private userData: UserData = {}

  public setUserData(userData: UserData) {
    this.userData = userData
  }

  public setUserId(user_id: string) {
    this.userData.user_id = user_id
  }

  public setIpAddress(ip_address: string) {
    this.userData.ip_address = ip_address
  }

  public setUserAgent(user_agent: string) {
    this.userData.user_agent = user_agent
  }

  public async userAction(
    action_type: UserActionType,
    action_details: string,
  ): Promise<void> {
    await UserActionLog.create({
      action_type,
      action_details,
      ...this.userData,
    })
  }

  public async httpError(data: HttpError, message: string): Promise<void> {
    await HttpErrorLog.create({
      ...data,
      message,
      ip_address: this.userData.ip_address,
    })
  }

  public async appError(
    error_type: string,
    message: string,
    url: string | undefined = '',
  ): Promise<void> {
    await AppErrorLog.create({ error_type, message, url })
  }
}

export default new Logger()
