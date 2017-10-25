<?php

namespace Fei\Service\Notification\Command;

use Composer\Script\Event;

/**
 * Class InstallAssets
 *
 * @package Command
 */
class InstallAssets
{
    public static function postUpdate(Event $event)
    {
        $composer = $event->getComposer();
        $package = $composer->getPackage();
        $extra = $package->getExtra();

        if (empty($extra['notification-center']['vendor-path'])) {
            throw new \Exception("Extra parameter vendor-path doesn't exists in your composer.json");
        }

        $targetPath = $extra['notification-center']['vendor-path'] . '/fei/notification-center/dist';

        if (empty($extra['notification-center']['public-path'])) {
            throw new \Exception("Extra parameter doesn't exists in your composer.json");
        }

        $publicPath = $extra['notification-center']['public-path'];
        $link = $publicPath . '/notification-center';

        if (!is_dir($publicPath)) {
            mkdir($publicPath, 0775, true);
        }

        if (is_link($link)) {
            unlink($link);
        }

        symlink($targetPath, $link);
        $event->getIO()->write(sprintf('<info>Symlink successfully created</info>'));
    }
}
