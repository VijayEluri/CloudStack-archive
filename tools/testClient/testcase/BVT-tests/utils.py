# -*- encoding: utf-8 -*-
#
# Copyright (c) 2012 Citrix.  All rights reserved.
#

"""Utilities functions
"""

import time
import remoteSSHClient
from cloudstackAPI import *
import cloudstackConnection
#from cloudstackConnection import cloudConnection
import configGenerator
import logging
import string
import random

def random_gen(size = 6, chars = string.ascii_uppercase + string.digits):
    """Generate Random Strings of variable length"""
    return ''.join(random.choice(chars) for x in range(size))

def cleanup_resources(api_client, resources):
    """Delete resources"""
    for obj in resources:
        obj.delete(api_client)

def is_server_ssh_ready(ipaddress, port, username, password, retries = 50):
    """Return ssh handle else wait till sshd is running"""
    loop_cnt = retries
    while True:
        try:
            ssh = remoteSSHClient.remoteSSHClient(
                                            ipaddress,
                                            port,
                                            username,
                                            password
                                            )
        except Exception as e:
            if loop_cnt == 0:
                raise e
            loop_cnt = loop_cnt - 1
            time.sleep(60)
        else:
            return ssh


def format_volume_to_ext3(ssh_client, device = "/dev/sda"):
    """Format attached storage to ext3 fs"""
    cmds = [
            "echo -e 'n\np\n1\n\n\nw' | fdisk %s" % device,
            "mkfs.ext3 %s1" % device,
           ]
    for c in cmds:
        ssh_client.execute(c)

def fetch_api_client(config_file = 'datacenterCfg'):
    """Fetch the Cloudstack API Client"""
    config = configGenerator.get_setup_config(config_file)
    mgt = config.mgtSvr[0]
    testClientLogger = logging.getLogger("testClient")
    asyncTimeout = 3600
    return cloudstackAPIClient.CloudStackAPIClient(
            cloudstackConnection.cloudConnection(
                                                mgt.mgtSvrIp,
                                                mgt.port,
                                                mgt.apiKey,
                                                mgt.securityKey,
                                                asyncTimeout,
                                                testClientLogger
                                                )
                                            )
