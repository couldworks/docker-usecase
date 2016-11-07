package co.couldworks.listener;

import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import reactor.Environment;
import reactor.bus.EventBus;
import reactor.bus.selector.Selector;
import reactor.bus.selector.Selectors;
import reactor.io.codec.StandardCodecs;
import reactor.io.net.NetStreams;
import reactor.io.net.ReactorChannelHandler;
import reactor.io.net.http.HttpChannel;
import reactor.rx.Streams;

/**
 * Created by flavio on 11/07/16.
 */
@Component
public class ReadyAppEventListener  {

    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) throws InterruptedException {

        final EventBus serverReactor = EventBus.create(Environment.get());

        Selector readingsMessageSelector = Selectors.object("readingsMessage");
        Selector queryRuleSelector = Selectors.object("queryRule");

        NetStreams.<String, String>httpServer(spec -> spec.codec(StandardCodecs.STRING_CODEC)
                .listen(3000))
                .get("/oilas", devicesHandler())
                .start()
                .await();



    }


    private ReactorChannelHandler<String, String, HttpChannel<String, String>> devicesHandler() {
        return channel -> {


//            if(response != null) {
//                return channel.writeWith(Streams.just(Buffer.wrap(response.getPayload()).asString()));
//            } else {
                return channel.writeWith(Streams.just("Oilas!"));
//            }
        };
    }

}
