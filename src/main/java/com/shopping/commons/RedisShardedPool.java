package com.shopping.commons;

import com.shopping.util.PropertiesUtil;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.JedisShardInfo;
import redis.clients.jedis.ShardedJedis;
import redis.clients.jedis.ShardedJedisPool;
import redis.clients.util.Hashing;
import redis.clients.util.Sharded;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by geely
 */
public class RedisShardedPool {
    private static ShardedJedisPool pool;//sharded jedis杩炴帴姹�
    private static Integer maxTotal = Integer.parseInt(PropertiesUtil.getProperty("redis.max.total","20")); //鏈�澶ц繛鎺ユ暟
    private static Integer maxIdle = Integer.parseInt(PropertiesUtil.getProperty("redis.max.idle","20"));//鍦╦edispool涓渶澶х殑idle鐘舵��(绌洪棽鐨�)鐨刯edis瀹炰緥鐨勪釜鏁�
    private static Integer minIdle = Integer.parseInt(PropertiesUtil.getProperty("redis.min.idle","20"));//鍦╦edispool涓渶灏忕殑idle鐘舵��(绌洪棽鐨�)鐨刯edis瀹炰緥鐨勪釜鏁�

    private static Boolean testOnBorrow = Boolean.parseBoolean(PropertiesUtil.getProperty("redis.test.borrow","true"));//鍦╞orrow涓�涓猨edis瀹炰緥鐨勬椂鍊欙紝鏄惁瑕佽繘琛岄獙璇佹搷浣滐紝濡傛灉璧嬪�紅rue銆傚垯寰楀埌鐨刯edis瀹炰緥鑲畾鏄彲浠ョ敤鐨勩��
    private static Boolean testOnReturn = Boolean.parseBoolean(PropertiesUtil.getProperty("redis.test.return","true"));//鍦╮eturn涓�涓猨edis瀹炰緥鐨勬椂鍊欙紝鏄惁瑕佽繘琛岄獙璇佹搷浣滐紝濡傛灉璧嬪�紅rue銆傚垯鏀惧洖jedispool鐨刯edis瀹炰緥鑲畾鏄彲浠ョ敤鐨勩��

    private static String redis1Ip = PropertiesUtil.getProperty("redis1.ip");
    private static Integer redis1Port = Integer.parseInt(PropertiesUtil.getProperty("redis1.port"));
    private static String redis2Ip = PropertiesUtil.getProperty("redis2.ip");
    private static Integer redis2Port = Integer.parseInt(PropertiesUtil.getProperty("redis2.port"));




    private static void initPool(){
        JedisPoolConfig config = new JedisPoolConfig();

        config.setMaxTotal(maxTotal);
        config.setMaxIdle(maxIdle);
        config.setMinIdle(minIdle);

        config.setTestOnBorrow(testOnBorrow);
        config.setTestOnReturn(testOnReturn);

        config.setBlockWhenExhausted(true);//杩炴帴鑰楀敖鐨勬椂鍊欙紝鏄惁闃诲锛宖alse浼氭姏鍑哄紓甯革紝true闃诲鐩村埌瓒呮椂銆傞粯璁や负true銆�

        JedisShardInfo info1 = new JedisShardInfo(redis1Ip,redis1Port,1000*2);

        JedisShardInfo info2 = new JedisShardInfo(redis2Ip,redis2Port,1000*2);

        List<JedisShardInfo> jedisShardInfoList = new ArrayList<JedisShardInfo>(2);

        jedisShardInfoList.add(info1);
        jedisShardInfoList.add(info2);

        pool = new ShardedJedisPool(config,jedisShardInfoList, Hashing.MURMUR_HASH, Sharded.DEFAULT_KEY_TAG_PATTERN);
    }

    static{
        initPool();
    }

    public static ShardedJedis getJedis(){
        return pool.getResource();
    }


    public static void returnBrokenResource(ShardedJedis jedis){
        pool.returnBrokenResource(jedis);
    }



    public static void returnResource(ShardedJedis jedis){
        pool.returnResource(jedis);
    }


    public static void main(String[] args) {
        ShardedJedis jedis = pool.getResource();

        for(int i =0;i<10;i++){
            jedis.set("key"+i,"value"+i);
        }
        returnResource(jedis);

//        pool.destroy();//涓存椂璋冪敤锛岄攢姣佽繛鎺ユ睜涓殑鎵�鏈夎繛鎺�
        System.out.println("program is end");


    }
}
