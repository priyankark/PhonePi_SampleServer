package com.example.websocketserver;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import java.io.IOException;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;



public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MyApplication";
    private static final int SERVER_PORT = 12345;
    InetAddress inetAddress = getInetAddress();

    private MySocketServer mServer;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button startBtn=findViewById(R.id.StartBtn);
        Button closeBtn=findViewById(R.id.CloseBtn);
        final TextView serveraddress=findViewById(R.id.ServerName);
        final TextView output=findViewById(R.id.output);


     startBtn.setOnClickListener(new View.OnClickListener() {
         @Override
         public void onClick(View view) {
             startServer();
             Toast.makeText(MainActivity.this,"server Started",Toast.LENGTH_SHORT).show();
         }
     });
     closeBtn.setOnClickListener(new View.OnClickListener() {
         @Override
         public void onClick(View view) {
             try {

                 mServer.stop();
                 Toast.makeText(MainActivity.this,"server stopped",Toast.LENGTH_SHORT).show();
                 serveraddress.setVisibility(View.GONE);
                 output.setVisibility(View.GONE);


             } catch (IOException e) {
                 Toast.makeText(MainActivity.this,"enable to stop server",Toast.LENGTH_SHORT);
                 e.printStackTrace();
             } catch (InterruptedException e) {
                 e.printStackTrace();
             }

         }
     });



    }


    private void startServer() {

        TextView serveraddress=findViewById(R.id.ServerName);
        TextView output=findViewById(R.id.output);
        if (inetAddress == null) {
            Log.e(TAG, "Unable to lookup IP address");
            return;
        }
        serveraddress.setText("Enter this ip address in PhonePi app "+inetAddress+":12345");
        serveraddress.setVisibility(View.VISIBLE);
        output.setVisibility(View.VISIBLE);
        Log.d(TAG, "startServer: "+ inetAddress);

        mServer = new MySocketServer(new InetSocketAddress(inetAddress.getHostAddress(), SERVER_PORT));
        mServer.start();
    }

    private static InetAddress getInetAddress() {
        try {
            for (Enumeration en = NetworkInterface.getNetworkInterfaces(); en.hasMoreElements();) {
                NetworkInterface networkInterface = (NetworkInterface) en.nextElement();

                for (Enumeration enumIpAddr = networkInterface.getInetAddresses(); enumIpAddr.hasMoreElements();) {
                    InetAddress inetAddress = (InetAddress) enumIpAddr.nextElement();

                    if (!inetAddress.isLoopbackAddress() && inetAddress instanceof Inet4Address) {
                        return inetAddress;
                    }
                }
            }
        } catch (SocketException e) {
            e.printStackTrace();
            Log.e(TAG, "Error getting the network interface information");
        }

        return null;
    }
}
