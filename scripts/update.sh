#!/bin/bash

echo "Starting Building..."

cd ./package/

pnpx unbuild

while true; do
    echo "Choose the type of update"
    echo "1) FIX UPDATE"
    echo "2) MINOR UPDATE"
    echo "3) MAJOR UPDATE"
    read -p "Option [1-3]: " option
    case $option in
        1)
            echo "Uploading fix update..."
            powershell -Command "& { $env:KIND='FIX'; bun 'C:\\Users\\johan\\Desktop\\Vimn\\Projects\\commanduploader\\scripts\\update.ts' }"
            break
            ;;
        2)
            echo "Uploading minor update..."
            powershell -Command "& { $env:KIND='MINOR'; bun 'C:\\Users\\johan\\Desktop\\Vimn\\Projects\\commanduploader\\scripts\\update.ts' }"
            break
            ;;
        3)
            echo "Uploading major update..."
            powershell -Command "& { $env:KIND='MAJOR'; bun 'C:\\Users\\johan\\Desktop\\Vimn\\Projects\\commanduploader\\scripts\\update.ts' }"
            break
            ;;
        *)
            echo "Opción inválida. Por favor, elige una opción entre 1 y 3."
            ;;
    esac
done

read -n 1 -s -r -p "Press any key to close"
echo
