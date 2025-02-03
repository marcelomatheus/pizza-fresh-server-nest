import { UnprocessableEntityException } from "@nestjs/common"

export function handleError(error: Error): undefined{
    const messageLines = error.message.split('\n')
    const messageError = messageLines[messageLines.length-1].trim()
    throw new UnprocessableEntityException(messageError || 'Algum erro ocorreu ao executar a operação')
}