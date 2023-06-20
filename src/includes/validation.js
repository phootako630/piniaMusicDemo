import {
  configure,
  defineRule,
  ErrorMessage,
  Field as VeeField,
  Form as VeeFrom
} from 'vee-validate'
import {
  alpha_spaces as alphaSpaces,
  confirmed,
  email,
  max,
  max_value as maxVal,
  min,
  min_value as minVal,
  not_one_of as excluded,
  required
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeFrom)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('email', email)
    defineRule('min_value', minVal)
    defineRule('max_value', maxVal)
    defineRule('confirmed', confirmed)
    defineRule('excluded', excluded)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
          email: `The field ${ctx.field} must be a valid email.`,
          min_value: `The field ${ctx.field} is too low.`,
          max_value: `The field ${ctx.field} is too high.`,
          confirmed: `The field ${ctx.field} does not match.`,
          excluded: `You are not allowed to use this value for the field ${ctx.field}.`
        }
        return messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`
      }
    })
  }
}
