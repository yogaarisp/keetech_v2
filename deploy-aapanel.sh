#!/usr/bin/env bash
# Deploy KeeTech (Next.js standalone) ke server aaPanel.
#
# Prasyarat:
#   1. Project sudah ada di /www/wwwroot/keetech (git clone / upload zip)
#   2. Node.js 20 LTS + PM2 terpasang
#   3. ADMIN_PASSWORD sudah di-set (via env variabel, contoh di bawah)
#
# Cara pakai (dari folder /www/wwwroot/keetech di server):
#   ADMIN_PASSWORD=rahasia bash deploy-aapanel.sh
set -euo pipefail

APP_DIR="/www/wwwroot/keetech"
DEPLOY_DIR="${APP_DIR}/deploy"

cd "$APP_DIR"

echo "==> install dependencies"
npm ci

echo "==> build"
npm run build

echo "==> prepare standalone deploy dir"
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"
cp -r .next/standalone/. "$DEPLOY_DIR"/
cp -r .next/static "$DEPLOY_DIR/.next/static"
cp -r public "$DEPLOY_DIR/public"

echo "==> seed content data"
mkdir -p "$DEPLOY_DIR/data"
cp data/content.json "$DEPLOY_DIR/data/content.json"

echo "==> permissions (admin menulis data/, form menyimpan data/inquiries.json)"
chown -R www:www "$APP_DIR"
chmod -R 775 "$DEPLOY_DIR/data"

echo "==> (re)start PM2"
pm2 startOrReload ecosystem.config.js
pm2 save

echo "==> selesai. Cek: pm2 status"