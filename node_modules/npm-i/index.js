'use strict'

const exec = require('child_process').exec
const path = require('path')
const _    = require('lodash')

module.exports = function (deps, opts, cb) {
  cb = _.isFunction(deps) ? deps : _.isFunction(opts) ? opts :
    _.isFunction(cb) ? cb : _.noop
  opts = _.isObject(deps) && !_.isArray(deps) ?
    deps : _.isObject(opts) ? opts : {}
  deps = _.isString(deps) || _.isArray(deps) ? deps : []

  let args = opts.args || []
  opts.save    || args.push('-S')
  opts.saveDev || args.push('-D')

  if (!opts.path) opts.path = process.cwd()

  let child = exec(['npm i'].concat(args, deps).join(' '), {
    cwd: opts.path
  }, (err) => {
    if (err) return cb(err)

    cb()
  })

  let stdout = opts.stdout || process.stdout,
    stderr = opts.stderr || process.stderr
  child.stdout.on('data', data => stdout.write(data))
  child.stderr.on('data', data => stderr.write(data))
}
